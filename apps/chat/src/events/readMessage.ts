import { EventFile } from '@inc/types';
import eventLogHelper from '../utils/logger';
import { EVENTS } from '@inc/events';
import prisma from '@/db';
import SocketUserStore from '@/store/SocketUserStore';
import RoomOccupantsStore from '@/store/RoomOccupantsStore';

const eventName = EVENTS.CLIENT.MESSAGE.READ;

const readMessage: EventFile = (_, socket) => ({
  eventName: eventName,
  type: 'on',
  callback: (roomId, ack) => {
    const eventLog = eventLogHelper(eventName, socket);

    eventLog('trace', `Attempting to retrieve userId for socket (${socket.id}) from cache...`);
    const [, userId] = SocketUserStore.searchSocketUser('socketId', socket.id);

    eventLog('trace', `Updating messages in database...`);
    prisma.messages
      .updateMany({
        where: {
          room: roomId,
          author: {
            not: userId,
          },
        },
        data: {
          read: true,
        },
      })
      .then(({ count }) => {
        eventLog('debug', `Updated ${count} messages in database.`);

        prisma.messages
          .findMany({
            where: {
              room: roomId,
              author: {
                not: userId,
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
            select: {
              id: true,
            },
            take: count,
          })
          .then((messages) => {
            eventLog('debug', `Retrieved ${messages.length} messages from database.`);

            let messageIds: number[] = [];

            eventLog('trace', `Mapping messages to messageIds...`);
            for (const message of messages) {
              messageIds.push(message.id);
            }

            eventLog('debug', `Mapped messageIds: ${messageIds}`);

            eventLog('trace', `Acknowledging message read...`);
            ack({ success: true, data: { count, messageIds } });

            eventLog('trace', `Attempting to retrieve other occupant from cache...`);
            const [, occupants] = RoomOccupantsStore.searchRoomOccupantsByRoomId(roomId);
            const otherOccupant = occupants[0] === userId ? occupants[1] : occupants[0];

            eventLog('trace', `Attempting to retrieve other occupant socketId from cache...`);
            const [otherOccupantSocketId] = SocketUserStore.searchSocketUser(
              'userId',
              otherOccupant
            );

            eventLog(
              'trace',
              `Emitting ${EVENTS.SERVER.MESSAGE.READ} to ${otherOccupantSocketId}...`
            );
            socket.to(otherOccupantSocketId).emit(EVENTS.SERVER.MESSAGE.READ, messageIds);
          })
          .catch(() => {
            eventLog('error', `Failed to retrieve messages from database.`);
            ack({ success: false });
          });
      })
      .catch(() => {
        eventLog('error', `Failed to update messages in database.`);
        ack({ success: false });
      });
  },
});

export default readMessage;
