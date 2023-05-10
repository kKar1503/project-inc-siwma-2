import { Server } from 'socket.io';
import logger from './utils/logger';
import { EventFile } from '@inc/types';
import { EVENTS } from '@inc/events';
import * as eventModules from './events';

const events: Record<string, EventFile> = Object(eventModules);

export default (io: Server) => {
  logger.info('Sockets enabled');

  io.on(EVENTS.CONNECTION.CONNECT, (socket) => {
    logger.info(`${socket.id} is connected.`);
    let eventsAttached: string[] = [];
    for (const event of Object.values(events)) {
      const { callback, eventName, type } = event(io);
      socket[type](eventName, callback);
      eventsAttached.push(eventName);
    }

    socket.once(EVENTS.CONNECTION.DISCONNECT, () => {
      logger.info(`Disconnected: ${socket.id}`);
    })

    logger.info(`Attached ${eventsAttached.length} events to ${socket.id}`);
  });
};
