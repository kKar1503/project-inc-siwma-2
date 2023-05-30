import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';
import prisma, { ContentType } from '@inc/db';

const newMsgEvent: EventFile = (io, socket) => ({
  eventName: EVENTS.CLIENT.SEND_MESSAGE,
  type: 'on',
  callback: ({ roomId, message, username, contentType, file, time }, successCallback) => {
    logger.info(`New message: ${message}`);

    let content: string = message;
    switch (contentType) {
      case ContentType.file:
        // s3 stuff
        break;
      case ContentType.offer:
        // offer stuff
        break;
      default:
        // ignore as message is already set
        break;
    }

    const callback = (successObj: { success: boolean }) => {
      socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
        sender: username,
        message: message,
        messageType: contentType,
        room: roomId,
        file: file,
        timestamp: time,
      });
      successCallback(successObj);
    };

    prisma.messages.create({
      data: {
        content,
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
