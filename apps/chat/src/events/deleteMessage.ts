import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';
import prisma from '@inc/db';

const deleteMessageEvent: EventFile = (io) => ({
  eventName: EVENTS.CLIENT.DELETE_MESSAGE,
  type: 'on',
  callback: async ({ room, messageId }) => {
    logger.info(`${messageId}  ${room}`);
    const args = {
      room,
      messageId,
    };

    prisma.messages.delete({
      where: {
        id: messageId,
      },
    }).then(() => {
      io.to(room).emit(EVENTS.SERVER.DELETE_MESSAGE, {
        ...args,
        success: true,
      });
    }).catch((err) => {
      logger.error(err);
      io.to(room).emit(EVENTS.SERVER.DELETE_MESSAGE, {
        ...args,
        success: false,
      });
    });
  },
});

export default deleteMessageEvent;
