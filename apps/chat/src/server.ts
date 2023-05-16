import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import logger from './utils/logger';
import typedSocket from './utils/typedSocket';

import socket from './socket';

config();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 4000;
const corsOrigin = process.env.CORS ?? 'http://localhost:3000';

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.get('/', (_, res) => {
  res.send(`Server is up!`);
});

setInterval(() => {
  typedSocket(io)('serverPing', `Pinged: ${new Date().toISOString()}`);
}, 5000);

httpServer.listen(port, host, () => {
  logger.info(`Server has started on port ${port}.`);

  socket(io);
});
