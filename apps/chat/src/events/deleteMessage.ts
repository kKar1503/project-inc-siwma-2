import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';
import prisma from '@inc/db';

const deleteMessageEvent: EventFile = (io) => ({
  eventName: EVENTS.CLIENT.DELETE_MESSAGE,
  type: 'on',
  callback: async ({ room, messageId }, callback) => {
    logger.info(`${messageId}  ${room}`);
    io.to(room).emit(EVENTS.SERVER.DELETE_MESSAGE, messageId);

    prisma.messages.delete({
      where: {
        id: messageId,
      },
    }).then(() => {
      callback({ success: true });
    }).catch(() => {
      callback({ success: false });
    });
  },
});

export default deleteMessageEvent;
