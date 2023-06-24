// ** Types Imports **
import { EventFile, TypedSocketEmitter } from '@inc/types';

// ** Events Imports **
import { EVENTS } from '@inc/events';

// ** Logger Imports **
import eventLogHelper from '@/utils/logger';

// ** Store Imports **
import RoomOccupantsStore from '@/store/RoomOccupantsStore';
import SocketUserStore from '@/store/SocketUserStore';

// ** Prisma Imports **
import prisma from '@/db';

// ** Event Name **
const eventName = EVENTS.CLIENT.MESSAGE.SYNC;

// ** Event File **
const syncMessage: EventFile = (io, socket) => ({
  eventName: eventName,
  type: 'on', // 'on' | 'once'
  callback: (lastMessageId, ack) => {
    // ** Event Logger **
    const eventLog = eventLogHelper(eventName, socket);

    // ** Event Implementation **
    eventLog('trace', `Attempting to retrieve userId for socket (${socket.id}) from cache...`);
    const [, userId] = SocketUserStore.searchSocketUser('socketId', socket.id);

    eventLog('trace', `Attempting to retrieve roomIds for userId (${userId}) from database...`);
    prisma.rooms
      .findMany({
        where: {
          OR: [
            {
              buyer: userId,
            },
            {
              seller: userId,
            },
          ],
        },
        select: {
          id: true,
        },
      })
      .then((rooms) => {
        eventLog('debug', `Rooms fetched from database: ${rooms}`);

        eventLog('trace', `Mapping rooms to roomIds...`);
        const roomIds = new Array(rooms.length);
        for (const room of rooms) {
          roomIds.push(room.id);
        }

        eventLog('debug', `RoomIds mapped: ${roomIds}`);

        eventLog('trace', `Attempting to retrieve messages for roomIds from database...`);
        prisma.messages
          .findMany({
            where: {
              room: {
                in: roomIds,
              },
              id: {
                gt: lastMessageId,
              },
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

              eventLog(
                'info',
                `Informing socket (${socket.id}) that there are no messages to sync...`
              );
              (io.emit as TypedSocketEmitter)(EVENTS.SERVER.MESSAGE.SYNC, {
                status: 'error',
                err: 'No messages to sync.',
              });

              return;
            }

            eventLog('trace', `Sending messages to socket (${socket.id})...`);
            messages.forEach((message, idx) => {
              eventLog('trace', `Sending message (${message.id}) to socket (${socket.id})...`);
              (io.emit as TypedSocketEmitter)(EVENTS.SERVER.MESSAGE.SYNC, {
                status: 'in_progress',
                progress: Math.floor(((idx + 1) / messages.length) * 100),
                message: message,
              });
            });

            eventLog('trace', `Informing socket (${socket.id}) that all messages have been sent.`);
            (io.emit as TypedSocketEmitter)(EVENTS.SERVER.MESSAGE.SYNC, {
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
      })
      .catch(() => {
        eventLog('error', `Failed to retrieve rooms from database.`);

        eventLog('trace', `Acknowledging failure to socket (${socket.id})...`);
        ack({
          success: false,
          err: {
            message: 'Failed to retrieve rooms from database.',
          },
        });
      });
  },
});

export default syncMessage;
