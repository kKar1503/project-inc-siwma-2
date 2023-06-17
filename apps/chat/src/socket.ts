import { Server } from 'socket.io';
import logger from './utils/logger';
import { EventFile } from '@inc/types';
import { EVENTS } from '@inc/events';
import * as eventModules from './events';

const events: Record<string, EventFile> = Object(eventModules);

export default (io: Server) => {
  logger.info('Sockets enabled');

  io.on(EVENTS.CONNECTION.CONNECT, (socket) => {
    const logHeader = `[${socket.id}]`;

    logger.info(`${logHeader} Socket is connected.`);
    let eventsAttached: string[] = [];

    // Attaching event listeners
    for (const event of Object.values(events)) {
      const { callback, eventName, type } = event(io, socket);
      socket[type](eventName, callback);
      eventsAttached.push(eventName);
    }
    logger.info(`${logHeader} Attached ${eventsAttached.length} events.`);

    socket.once(EVENTS.CONNECTION.DISCONNECT, () => {
      // Detaching event listeners
      logger.info(`${logHeader} Removing all listeners from socket.`);
      socket.removeAllListeners();

      logger.info(`${logHeader} Socket is disconnected.`);
    });
  });
};
