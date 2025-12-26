import http from "http";
import { Server } from "socket.io";
import express from 'express';
import { FRONTEND_URL, NODE_ENV } from "./env.js";
import socketAuthMiddleware from "../middleware/socketAuth.middleware.js";

const app = express();
const server = http.createServer(app);

const isDevelopment = NODE_ENV === 'development';
const allowedOrigins = isDevelopment 
  ? ['http://localhost:5173'] 
  : [FRONTEND_URL].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins, 
    credentials: true,
    methods: ['GET', 'POST']
  },
});

io.use(socketAuthMiddleware);

// Store online users
const userSocketMap = {};

io.on('connection', (socket) => {
  console.log("A user connected", socket.user.userName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log("A user disconnected", socket.user.userName);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

//  get socket ID by user ID
export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

export { io, app, server };