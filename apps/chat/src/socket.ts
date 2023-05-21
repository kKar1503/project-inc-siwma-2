import { Server } from 'socket.io';
import logger from './utils/logger';
import { EventFile } from '@inc/types';
import { EVENTS } from '@inc/events';
import * as eventModules from './events';
import { socketGuardMiddleware } from './middlewares';
import errorHandler from './utils/errorHandler';

const events: Record<string, EventFile> = Object(eventModules);

export default (io: Server) => {
  logger.info('Sockets enabled');

  // Attach middlewares
  io.use(socketGuardMiddleware);

  // On connection
  io.on(EVENTS.CONNECTION.CONNECT, (socket) => {
    logger.info(`${socket.id} is connected.`);

    // Attach events
    const eventsAttached: string[] = [];
    for (const event of Object.values(events)) {
      // Deconstruct event object
      const { callback, eventName, type } = event(io, socket);

      // Wrap the event in the error handler
      const wrappedEvent = errorHandler(socket, callback);

      socket[type](eventName, wrappedEvent as (...args: any[]) => void);
      eventsAttached.push(eventName);
    }

    socket.once(EVENTS.CONNECTION.DISCONNECT, () => {
      logger.info(`Disconnected: ${socket.id}`);
    });

    logger.info(`Attached ${eventsAttached.length} events to ${socket.id}`);
  });
};
