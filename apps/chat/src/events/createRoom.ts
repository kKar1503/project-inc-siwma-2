import { EventFile, TypedSocketEmitter } from '@inc/types';
import eventLogHelper from '@/utils/logger';
import { EVENTS } from '@inc/events';
import prisma from '@/db';
import SocketUserStore from '@/store/SocketUserStore';

const eventName = EVENTS.CLIENT.ROOM.CREATE;

const createRoom: EventFile = (io, socket) => ({
  eventName: eventName,
  type: 'on',
  callback: ({ sellerId, listingId }, ack) => {
    const eventLog = eventLogHelper(eventName, socket);

    eventLog('trace', `Attempting to retrieve userId for socket (${socket.id}) from cache...`);
    const [, userId] = SocketUserStore.searchSocketUser('socketId', socket.id);

    eventLog('debug', `Room data (sellerId): ${sellerId}`);
    eventLog('debug', `Room data (buyerId): ${userId}`);
    eventLog('debug', `Room data (listingId): ${listingId}`);

    eventLog('trace', `Checking if room already exists in database...`);
    prisma.rooms
      .findFirst({
        where: {
          AND: [
            {
              seller: sellerId,
            },
            {
              buyer: userId,
            },
            {
              listing: listingId,
            },
          ],
        },
      })
      .then((room) => {
        if (room !== null) {
          eventLog('debug', `Room already exists in database. RoomId: ${room.id}`);

          eventLog('trace', `Acknowledging room already exists...`);
          ack({ success: false, err: { message: 'Room already exists.' } });

          eventLog('error', `Disconnecting socket... Reason: Room already exists in database.`);
          socket.disconnect(true);
          return;
        } else {
          eventLog('debug', `Room does not exist in database.`);

          eventLog('trace', `Creating room in database...`);
          prisma.rooms
            .create({
              data: {
                listing: listingId,
                seller: sellerId,
                buyer: userId,
              },
            })
            .then(({ id }) => {
              eventLog('debug', `Created room in database.`);

              eventLog('trace', `Acknowledging room created...`);
              ack({ success: true, data: { id } });

              eventLog('trace', `Attempting to retrieve seller socketId from cache...`);
              const [sellerSocketId] = SocketUserStore.searchSocketUser('userId', sellerId);

              eventLog('trace', `Emitting ${EVENTS.SERVER.ROOM.CREATED} to ${sellerSocketId}...`);
              (io.to(sellerSocketId).emit as TypedSocketEmitter)(EVENTS.SERVER.ROOM.CREATED, {
                id,
                user: userId,
              });
            })
            .catch(() => {
              eventLog('error', `Failed to create room in database.`);
              ack({ success: false });
            });
        }
      })
      .catch(() => {
        eventLog('error', `Failed to check if room already exists in database.`);
        ack({ success: false });
      });
  },
});

export default createRoom;
