import { Server } from 'socket.io';
import logger from './utils/logger';
import { EventFile } from '@inc/types';
import { EVENTS } from '@inc/events';
import * as eventModules from './events';

const events: Record<string, EventFile> = Object(eventModules);

export default (io: Server) => {
  logger.trace(`Attaching Socket.io 'connect' event listener...`);
  io.on(EVENTS.CONNECTION.CONNECT, (socket) => {
    const logHeader = `[${socket.id}]`;

    logger.info(`${logHeader} Socket is connected.`);
    let eventsAttached: string[] = [];

    // Attaching custom event listeners
    logger.trace(`${logHeader} Attaching custom event listeners to socket...`);
    for (const event of Object.values(events)) {
      const { callback, eventName, type } = event(io, socket);

      logger.trace(`${logHeader} Attaching ${event} event listener to socket...`);
      socket[type](eventName, callback);

      eventsAttached.push(eventName);
    }
    logger.debug(
      `${logHeader} Attached ${eventsAttached.length} events. ${
        Object.entries(events).length - eventsAttached.length
      } failed.`
    );
    logger.debug(`${logHeader} Attached events: ${eventsAttached}.`);

    // Attaching disconnect event listener
    logger.trace(`${logHeader} Attaching Socket.io 'disconnect' event listener...`);
    socket.once(EVENTS.CONNECTION.DISCONNECT, (reason) => {
      // Detaching event listeners
      logger.trace(`${logHeader} Removing all listeners from socket.`);
      socket.removeAllListeners();

      logger.info(`${logHeader} Socket is disconnected. Reason: ${reason}.`);
    });
  });
};
