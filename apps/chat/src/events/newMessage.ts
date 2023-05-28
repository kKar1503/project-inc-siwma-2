import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';
import prisma, { ContentType } from '@inc/db';

const newMsgEvent: EventFile = (io) => ({
  eventName: EVENTS.CLIENT.SEND_MESSAGE,
  type: 'on',
  callback: ({ roomId, message, username, contentType, time },callback) => {
    logger.info(`New message: ${message}`);
    io.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
      sender: username,
      message: message,
      messageType: contentType,
      room: roomId,
      timestamp: time,
    });

    prisma.messages.create({
      data: {
        content: message,
        contentType: contentType as ContentType,
        room: roomId,
        author: username,
      },
    }).then(() => {
      callback({ success: true });
    }).catch(() => {
      callback({ success: false });
    });
  },
});

export default newMsgEvent;
