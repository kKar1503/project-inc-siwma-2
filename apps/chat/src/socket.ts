import { Server } from 'socket.io';
import logger from './utils/logger';
import { EventFile, Socket } from '@inc/types';
import { EVENTS } from '@inc/events';
import * as eventModules from './events';
import { socketGuardMiddleware } from './middlewares';
import errorHandler from './utils/errorHandler';

const events: Record<string, EventFile> = Object(eventModules);

// -- Functions -- //
/**
 * Attaches events to the socket
 */
const attachEvents = (io: Server, socket: Socket) => {
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

  return eventsAttached;
};

export default (io: Server) => {
  logger.info('Sockets enabled');

  // Attach middlewares
  io.use(socketGuardMiddleware);

  // On connection
  io.on(EVENTS.CONNECTION.CONNECT, (socket: Socket) => {
    // -- Handle initial connection -- //
    // Check if the user has been authenticated
    if (!socket.authenticated) {
      logger.info(`Rejected connection from ${socket.id} due to invalid token`);
      socket.disconnect();
      return;
    }

    // Log the connection
    logger.info(`${socket.id} is connected.`);

    // Attach events
    const eventsAttached = attachEvents(io, socket);
    logger.info(`Attached ${eventsAttached.length} events to ${socket.id}`);
  });
};
