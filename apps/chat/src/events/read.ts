import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';

const readEvent: EventFile = (io) => ({
  eventName: EVENTS.CLIENT.READ,
  type: 'on',
  callback: ({ roomId, messageId }) => {
    logger.info(`Message ${messageId} read`);
    io.to(roomId).emit(EVENTS.CLIENT.READ, { room: roomId, message: messageId });
  },
});

export default readEvent;
