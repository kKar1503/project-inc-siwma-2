import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';
import prisma from '@inc/db';


const readEvent: EventFile = (io, socket) => ({
  eventName: EVENTS.CLIENT.READ,
  type: 'on',
  callback: ({ room, messageId }, callback) => {
    logger.info(`Message ${messageId} read`);

    prisma.messages.update({
      where: {
        id: messageId,
      },
      data: {
        read: true,
      },
    }).then(() => {
      socket.to(room).emit(EVENTS.SERVER.READ, { room: room, message: messageId });
      callback({ success: true });
    }).catch(() => {
      callback({ success: false });
    });
  },
});

export default readEvent;
