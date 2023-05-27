import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';
import prisma, { ContentType } from '@inc/db';

const newMsgEvent: EventFile = (io) => ({
  eventName: EVENTS.CLIENT.SEND_MESSAGE,
  type: 'on',
  callback: ({ roomId, message, username, contentType, time }) => {
    logger.info(`New message: ${message}`);
    const args = {
      sender: username,
      message: message,
      messageType: contentType,
      room: roomId,
      timestamp: time,
    };

    prisma.messages.create({
      data: {
        content: message,
        contentType: contentType as ContentType,
        room: roomId,
        author: username,
      },
    }).then(() => {
      io.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
        ...args,
        success: true,
      });
    }).catch((err) => {
      logger.error(err);
      io.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
        ...args,
        success: false,
      });
    });
  },
});

export default newMsgEvent;
