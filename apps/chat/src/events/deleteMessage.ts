import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';
import prisma from '@inc/db';

const deleteMessageEvent: EventFile = (io, socket) => ({
  eventName: EVENTS.CLIENT.DELETE_MESSAGE,
  type: 'on',
  callback: async ({ room, messageId }, successCallback) => {
    logger.info(`${messageId}  ${room}`);

    const callback = (successObj: { success: boolean }) => {
      socket.to(room).emit(EVENTS.SERVER.DELETE_MESSAGE, messageId);
      successCallback(successObj);
    };

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
