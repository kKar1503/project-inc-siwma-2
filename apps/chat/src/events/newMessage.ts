import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';

const newMsgEvent: EventFile = (io) => ({
  eventName: EVENTS.CLIENT.SEND_MESSAGE,
  type: 'on',
  callback: ({roomId, message, username, time}) => {
    logger.info(`New message: ${message}`)
    io.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
      message, username, time
    })
  },
});

export default newMsgEvent;
