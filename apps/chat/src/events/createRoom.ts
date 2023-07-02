import { EventFile, Room, TypedSocketEmitter } from '@inc/types';
import eventLogHelper from '@/utils/logger';
import { EVENTS } from '@inc/events';
import prisma from '@/db';
import SocketUserStore from '@/store/SocketUserStore';

const eventName = EVENTS.CLIENT.ROOM.CREATE;

const createRoom: EventFile = (io, socket) => ({
  eventName: eventName,
  type: 'on',
  callback: ({ sellerId, buyerId, listingId }, ack) => {
    const eventLog = eventLogHelper(eventName, socket);

    eventLog('trace', `Attempting to fetch userId from cache...`);
    const [, userId] = SocketUserStore.searchSocketUser('socketId', socket.id);

    eventLog('debug', `Room data (sellerId): ${sellerId}`);
    eventLog('debug', `Room data (buyerId): ${buyerId}`);
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
              buyer: buyerId,
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
          if (typeof ack === 'function')
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
                buyer: buyerId,
              },
              select: {
                id: true,
                usersRoomsBuyerTousers: {
                  select: {
                    id: true,
                    name: true,
                    profilePicture: true,
                  },
                },
                usersRoomsSellerTousers: {
                  select: {
                    id: true,
                    name: true,
                    profilePicture: true,
                  },
                },
                listingRoomsListingTolisting: {
                  select: {
                    id: true,
                    name: true,
                    type: true,
                    multiple: true,
                    price: true,
                    unitPrice: true,
                    listingImages: {
                      select: {
                        image: true,
                      },
                      orderBy: {
                        order: 'asc',
                      },
                      take: 1,
                    },
                    offersOffersListingTolistings: {
                      select: {
                        accepted: true,
                      },
                    },
                  },
                },
              },
            })
            .then((room) => {
              eventLog('info', `Created new room (${room.id}) in database.`);

              eventLog('trace', `Mutating Room data (${room.id})...`);
              const data: Room = {
                id: room.id,
                username:
                  userId === room.usersRoomsSellerTousers.id
                    ? room.usersRoomsBuyerTousers.name
                    : room.usersRoomsSellerTousers.name,
                category: room.listingRoomsListingTolisting.type,
                itemId: room.listingRoomsListingTolisting.id,
                itemName: room.listingRoomsListingTolisting.name,
                itemPrice: room.listingRoomsListingTolisting.price.toNumber(),
                itemPriceIsUnit: room.listingRoomsListingTolisting.unitPrice,
                itemImage: room.listingRoomsListingTolisting.listingImages[0]?.image ?? '',
                inProgress: true,
                userImage:
                  userId === room.usersRoomsSellerTousers.id
                    ? room.usersRoomsBuyerTousers.profilePicture ?? ''
                    : room.usersRoomsSellerTousers.profilePicture ?? '',
                unreadMessages: 0,
              };

              eventLog('trace', `Acknowledging room created...`);
              if (typeof ack === 'function') ack({ success: true, data });

              eventLog('trace', `Attempting to retrieve other user socketId from cache...`);
              const [otherSocketId] = SocketUserStore.searchSocketUser(
                'userId',
                userId === room.usersRoomsSellerTousers.id
                  ? room.usersRoomsBuyerTousers.id
                  : room.usersRoomsSellerTousers.id
              );

              eventLog('info', `Emitting ${EVENTS.SERVER.ROOM.CREATED} to ${otherSocketId}...`);
              if (otherSocketId !== '')
                (io.to(otherSocketId).emit as TypedSocketEmitter)(EVENTS.SERVER.ROOM.CREATED, data);
            })
            .catch(() => {
              eventLog('error', `Failed to create room in database.`);
              if (typeof ack === 'function') ack({ success: false });
            });
        }
      })
      .catch(() => {
        eventLog('error', `Failed to check if room already exists in database.`);
        if (typeof ack === 'function') ack({ success: false });
      });
  },
});

export default createRoom;
