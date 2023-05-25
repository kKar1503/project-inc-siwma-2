import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';

const startType: EventFile = (io) => ({
  eventName: EVENTS.CLIENT.START_TYPE,
  type: 'on',
  callback: ({ sender, roomId }) => {
    logger.info(`User ${sender} starts typing`);
    io.to(roomId).emit(EVENTS.SERVER.START_TYPE, { sender: sender, room: roomId})
  },
});

export default startType;
