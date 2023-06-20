import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';
import prisma from '@inc/db';

const deleteMessageEvent: EventFile = (io, socket) => ({
  eventName: EVENTS.CLIENT.DELETE_MESSAGE,
  type: 'on',
  callback: async ({ room, messageId }, callback) => {
    logger.info(`${messageId}  ${room}`);

    prisma.messages.delete({
      where: {
        id: messageId,
      },
    }).then(() => {
      socket.to(room).emit(EVENTS.SERVER.DELETE_MESSAGE, messageId);
      callback({ success: true });
    }).catch(() => {
      callback({ success: false });
    });
  },
});

export default deleteMessageEvent;