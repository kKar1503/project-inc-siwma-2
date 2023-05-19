import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';

const startType: EventFile = (io) => ({
  eventName: EVENTS.CLIENT.START_TYPE,
  type: 'on',
  callback: ({ sender, room }) => {
    logger.info(`User ${sender} starts typing`);
    io.to(room).emit(EVENTS.CLIENT.START_TYPE, { sender: sender, room: room})
  },
});

export default startType;
