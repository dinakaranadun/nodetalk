import express from 'express'
import { NODE_ENV, PORT } from './src/config/env.js';



const app = express();

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});


app.get('/', (req, res) => {
  res.status(200).json({
    message: 'NODETALK API Server',
    version: '1.0.0',
    status: 'running'
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
});