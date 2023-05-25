import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';

const stopType: EventFile = (io) => ({
  eventName: EVENTS.CLIENT.STOP_TYPE,
  type: 'on',
  callback: ({ roomId, sender }) => {
    logger.info(`User ${sender} stopped typing`);
    io.to(roomId).emit(EVENTS.SERVER.STOP_TYPE, {
      sender: sender,
      room: roomId,
    });
  },
});

export default stopType;
