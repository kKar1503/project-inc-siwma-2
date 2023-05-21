import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';

const newMsgEvent: EventFile = (io) => ({
  eventName: EVENTS.CLIENT.SEND_MESSAGE,
  type: 'on',
  callback: ({ roomId, message, username, contentType, time }) => {
    logger.info(`New message: ${message}`);
    io.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
      sender: username,
      message: message,
      messageType: contentType,
      room: roomId,
      timestamp: time,
    });
  },
});

export default newMsgEvent;
