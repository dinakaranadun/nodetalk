import express from 'express'
import { NODE_ENV, PORT } from './src/config/env.js';
import connectDatabase from './src/config/database.js';
import authRouter from './src/routes/auth.route.js';
import { errorHandler, notFound } from './src/middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import userRouter from './src/routes/user.route.js';
import messageRouter from './src/routes/message.route.js';



const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});



app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/messages',messageRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'NODETALK API Server',
    version: '1.0.0',
    status: 'running'
  });
});


//404 not found
app.use(notFound);
//
//error middleware
app.use(errorHandler);

//server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
  connectDatabase();
});