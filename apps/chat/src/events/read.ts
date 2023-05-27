import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';
import prisma from '@inc/db';


const readEvent: EventFile = (io) => ({
  eventName: EVENTS.CLIENT.READ,
  type: 'on',
  callback: ({ room, messageId }) => {
    logger.info(`Message ${messageId} read`);
    const args = { room: room, message: messageId };
    prisma.messages.update({
      where: {
        id: messageId,
      },
      data: {
        read: true,
      },
    }).then(() => {
      io.to(room).emit(EVENTS.SERVER.READ, {
        ...args,
        success: true,
      });
    }).catch((err) => {
      logger.error(err);
      io.to(room).emit(EVENTS.SERVER.READ, {
        ...args,
        success: false,
      });
    });
  },
});

export default readEvent;
