import { config } from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

config();

import logger from './utils/logger';
import { spawnPapa } from './store';
import socket from './socket';

logger.info('Validating Env Variables...');
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT !== undefined ? Number(process.env.PORT) : 4000;
const corsOrigin = process.env.CORS.split(',') ?? 'http://localhost:3000';

logger.debug(`HOST: ${host}`);
logger.debug(`PORT: ${port}`);
logger.debug(`CORS: ${corsOrigin}`);

logger.info('Initializing Express Application...');
const app = express();

logger.info('Initializing HTTP Server with Express App...');
const httpServer = createServer(app);

logger.info('Initializing Socket.io Server...');
const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.get('/', (_, res) => {
  logger.info('GET: /');
  res.send('Server is up!');
});

httpServer.listen(port, host, () => {
  logger.info(`Server is now listening at ${host}:${port}...`);

  logger.info('Initializing Store...');
  spawnPapa();

  logger.info('Initializing Socket.io connection...');
  socket(io);
});
