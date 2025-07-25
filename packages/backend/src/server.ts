// Load environment variables first
import dotenv from 'dotenv';
dotenv.config();

// Initialize Sentry before importing other modules
import { initSentry } from './config/sentry';
initSentry();

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import * as Sentry from '@sentry/node';
import { ClientToServerEvents, ServerToClientEvents } from './types';
import { setupSocketHandlers } from './socket/socketHandlers';
import gameRoutes from './routes/gameRoutes';
import fileRoutes from './routes/fileRoutes';

const app = express();
const server = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/games', gameRoutes);
app.use('/api/files', fileRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Sentry error handler must be after all routes
Sentry.setupExpressErrorHandler(app);

// Setup Socket.IO handlers
setupSocketHandlers(io);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Socket.IO server ready`);
});

export { io };
