import { config } from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

config();

import logger from './utils/logger';
// import { spawnPapa } from './store';
import socket from './socket';
import RoomOccupantsStore from './store/RoomOccupantsStore';
import SocketUserStore from './store/SocketUserStore';

logger.info('Validating Env Variables...');
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT !== undefined ? Number(process.env.PORT) : 4000;
const corsOrigin = process.env.CORS.split(',') ?? 'http://localhost:3000';

logger.debug(`HOST: ${host}`);
logger.debug(`PORT: ${port}`);
logger.debug(`CORS: ${corsOrigin}`);

if (process.env.DATABASE_URL === undefined) {
  throw new Error('Missing DATABASE_URL env.');
}

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

  // Disabling PapaStore as temporary it may not be as relevant to each
  // storage solution.
  // logger.info('Initializing Store...');
  // spawnPapa();

  logger.info('Initializing RoomOccupantsStore...');
  RoomOccupantsStore.init();

  logger.info('Attaching StateListener to RoomOccupantsStore...');
  RoomOccupantsStore.attachStateListener((state) => {
    logger.debug(
      `RoomOccupantsStore State (Rooms): ${state.rooms.length} | ${JSON.stringify(state.rooms)}`
    );
    logger.debug(
      `RoomOccupantsStore State (Occupants): ${state.occupants.length} | ${JSON.stringify(
        state.occupants
      )}`
    );
  }, 5000);

  logger.info('Initializing SocketUserStore...');
  SocketUserStore.init();

  logger.info('Attaching StateListener to SocketUserStore...');
  SocketUserStore.attachStateListener((state) => {
    logger.debug(
      `SocketUserStore State (Sockets): ${state.sockets.length} | ${JSON.stringify(state.sockets)}`
    );
    logger.debug(
      `SocketUserStore State (Users): ${state.users.length} | ${JSON.stringify(state.users)}`
    );
  }, 5000);

  logger.info('Initializing Socket.io connection...');
  socket(io);
});
