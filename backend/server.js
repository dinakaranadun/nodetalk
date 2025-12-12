import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { FRONTEND_URL, NODE_ENV, PORT } from './src/config/env.js';
import connectDatabase from './src/config/database.js';
import authRouter from './src/routes/auth.route.js';
import userRouter from './src/routes/user.route.js';
import messageRouter from './src/routes/message.route.js';
import { errorHandler, notFound } from './src/middleware/error.middleware.js';
import requestTimeout from './src/middleware/requestTimeOut.middleware.js';

// ============================================
// Environment Variables Validation
// ============================================
const requiredEnvVars = ['PORT', 'NODE_ENV', 'MONGODB_URI', 'JWT_SECRET','FRONTEND_URL'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// ============================================
// App Configuration
// ============================================
const isDevelopment = NODE_ENV === 'development';
const allowedOrigins = isDevelopment 
  ? ['http://localhost:5173']
  : [FRONTEND_URL].filter(Boolean);

const app = express();

// ============================================
// Security Middleware
// ============================================
app.use(helmet({
  contentSecurityPolicy: isDevelopment ? false : undefined,
  crossOriginEmbedderPolicy: false
}));

// ============================================
// CORS Configuration
// ============================================
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie']
}));

// ============================================
// General Middleware
// ============================================
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Request Logging
if (isDevelopment) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Request Timeout Middleware
app.use(requestTimeout);

// ============================================
// Health Check Endpoint
// ============================================
app.get('/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    const healthData = {
      status: dbStatus === 'connected' ? 'OK' : 'DEGRADED',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      environment: NODE_ENV,
      database: dbStatus,
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
      }
    };

    const statusCode = dbStatus === 'connected' ? 200 : 503;
    res.status(statusCode).json(healthData);
  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ============================================
// Root Endpoint
// ============================================
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'NODETALK API Server',
    version: '1.0.0',
    status: 'running',
    environment: NODE_ENV,
    endpoints: {
      health: '/health',
      auth: '/api/v1/auth',
      users: '/api/v1/user',
      messages: '/api/v1/messages'
    }
  });
});

// ============================================
// API Routes (Arcjet protection should be on these routes)
// ============================================
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/messages', messageRouter);

// ============================================
// Error Handling
// ============================================
app.use(notFound);
app.use(errorHandler);

// ============================================
// Server Instance
// ============================================
let server;

// ============================================
// Graceful Shutdown Handler
// ============================================
const gracefulShutdown = async (signal) => {
  console.log(`\n🛑 ${signal} received: closing HTTP server gracefully...`);
  
  if (!server) {
    process.exit(0);
  }

  server.close(async () => {
    console.log('✅ HTTP server closed');
    
    try {
      await mongoose.connection.close(false);
      console.log('✅ Database connection closed');
      process.exit(0);
    } catch (err) {
      console.error('❌ Error during database shutdown:', err);
      process.exit(1);
    }
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.error('⚠️ Forced shutdown after timeout');
    process.exit(1);
  }, 30000);
};

// ============================================
// Process Event Handlers
// ============================================
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
  gracefulShutdown('UNHANDLED_REJECTION');
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

// ============================================
// Server Startup
// ============================================
const startServer = async () => {
  try {
    // Connect to database first
    await connectDatabase();
    console.log('✅ Database connected successfully');

    // Start server after successful DB connection
    server = app.listen(PORT, () => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🚀 Server running in ${NODE_ENV} mode`);
      console.log(`📡 Listening on port ${PORT}`);
      console.log(`🌐 API URL: http://localhost:${PORT}`);
      console.log(`💚 Health check: http://localhost:${PORT}/health`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });

    // Handle server errors
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use`);
      } else {
        console.error('❌ Server error:', error);
      }
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

export default app;