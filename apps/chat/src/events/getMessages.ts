// ** Types Imports **
import { EventFile, TypedSocketEmitter } from '@inc/types';

// ** Events Imports **
import { EVENTS } from '@inc/events';

// ** Logger Imports **
import eventLogHelper from '@/utils/logger';

// ** Store Imports **
import SocketUserStore from '@/store/SocketUserStore';

// ** Prisma Imports **
import prisma from '@/db';

// ** Event Name **
const eventName = EVENTS.CLIENT.MESSAGE.GET;

// ** Event File **
const event: EventFile = (io, socket) => ({
  eventName: eventName,
  type: 'on', // 'on' | 'once'
  callback: (roomId, ack) => {
    // ** Event Logger **
    const eventLog = eventLogHelper(eventName, socket);

    // ** Event Implementation **
    eventLog('trace', `Attempting to retrieve userId for socket (${socket.id}) from cache...`);
    const [, userId] = SocketUserStore.searchSocketUser('socketId', socket.id);

    eventLog('debug', `UserId retrieved from cache: ${userId}`);
    eventLog('debug', `Room id received: ${roomId}`);

    eventLog('trace', `Attempting to fetch messages for roomId (${roomId}) from database...`);
    prisma.messages
      .findMany({
        where: {
          room: roomId,
        },
      })
      .then((messages) => {
        eventLog('debug', `Number of messages fetched from database: ${messages.length}`);

        eventLog('trace', `Acknowledging message length to socket (${socket.id})...`);
        ack({
          success: true,
          data: messages.length,
        });

        if (messages.length === 0) {
          eventLog('debug', `No messages to sync.`);

          eventLog('info', `Informing socket (${socket.id}) that there are no messages to sync...`);
          (socket.emit as TypedSocketEmitter)(EVENTS.SERVER.MESSAGE.SYNC2, {
            status: 'error',
            err: 'No messages to sync.',
          });

          return;
        }

        eventLog('trace', `Sending messages to socket (${socket.id})...`);
        messages.forEach(({ createdAt, ...restMessage }, idx) => {
          eventLog('trace', `Sending message (${restMessage.id}) to socket (${socket.id})...`);
          (socket.emit as TypedSocketEmitter)(EVENTS.SERVER.MESSAGE.SYNC2, {
            status: 'in_progress',
            progress: Math.floor(((idx + 1) / messages.length) * 100),
            data: { ...restMessage, createdAt: JSON.stringify(createdAt) },
          });
        });

        eventLog('trace', `Informing socket (${socket.id}) that all messages have been sent.`);
        (socket.emit as TypedSocketEmitter)(EVENTS.SERVER.MESSAGE.SYNC2, {
          status: 'success',
        });
      })
      .catch(() => {
        eventLog('error', `Failed to retrieve messages from database.`);

        eventLog('trace', `Acknowledging failure to socket (${socket.id})...`);
        ack({
          success: false,
          err: {
            message: 'Failed to retrieve messages from database.',
          },
        });
      });
  },
});

export default event;
