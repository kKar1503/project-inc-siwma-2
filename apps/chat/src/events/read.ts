import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';

const readEvent: EventFile = (io) => ({
  eventName: EVENTS.CLIENT.READ,
  type: 'on',
  callback: ({ room, message }) => {
    logger.info(`Message ${message} read`);
    io.to(room).emit(EVENTS.SERVER.READ, { room: room, message: message });
  },
});

export default readEvent;
