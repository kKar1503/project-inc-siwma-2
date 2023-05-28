import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';
import prisma from '@inc/db';


const readEvent: EventFile = (io) => ({
  eventName: EVENTS.CLIENT.READ,
  type: 'on',
  callback: ({ room, messageId }) => {
    logger.info(`Message ${messageId} read`);
    io.to(room).emit(EVENTS.SERVER.READ, { room: room, message: messageId });
    prisma.messages.update({
      where: {
        id: messageId,
      },
      data: {
        read: true,
      },
    });
  },
});

export default readEvent;
