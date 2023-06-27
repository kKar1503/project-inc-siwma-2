// ** Types Imports **
import { EventFile, Room, TypedSocketEmitter } from '@inc/types';

// ** Events Imports **
import { EVENTS } from '@inc/events';

// ** Logger Imports **
import eventLogHelper from '@/utils/logger';

// ** Store Imports **
import SocketUserStore from '@/store/SocketUserStore';

// ** Prisma Imports **
import prisma from '@/db';

// ** Event Name **
const eventName = EVENTS.CLIENT.ROOM.GET;

// ** Event File **
const event: EventFile = (io, socket) => ({
  eventName: eventName,
  type: 'on', // 'on' | 'once'
  callback: (userId, ack) => {
    // ** Event Logger **
    const eventLog = eventLogHelper(eventName, socket);

    eventLog('debug', `UserId retrieved from cache: ${userId}`);

    eventLog('trace', `Attempting to fetch rooms for userId (${userId}) from database...`);
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
          usersRoomsBuyerTousers: {
            select: {
              id: true,
              name: true,
              profilePicture: true,
            },
          },
          usersRoomsSellerTousers: {
            select: {
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
              offersOffersListingTolistings: {
                select: {
                  accepted: true,
                },
              },
            },
          },
          messages: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
            select: {
              author: true,
              content: true,
              contentType: true,
              createdAt: true,
              offers: {
                select: {
                  accepted: true,
                  amount: true,
                },
              },
              read: true,
            },
          },
        },
      })
      .then(async (rooms) => {
        eventLog('debug', `Number of rooms fetched from database: ${rooms.length}`);

        eventLog('trace', `Acknowledging message length to socket (${socket.id})...`);
        if (typeof ack === 'function')
          ack({
            success: true,
            data: rooms.length,
          });

        if (rooms.length === 0) {
          eventLog('debug', `No rooms to sync.`);

          eventLog('info', `Informing socket (${socket.id}) that there are no rooms to sync...`);
          (socket.emit as TypedSocketEmitter)(EVENTS.SERVER.ROOM.SYNC, {
            status: 'error',
            err: 'No rooms to sync.',
          });

          return;
        }

        const roomIds = rooms.map((room) => room.id);

        const unreads = await prisma.messages
          .findMany({
            where: {
              room: {
                in: roomIds,
              },
              read: false,
            },
            select: {
              room: true,
            },
          })
          .then((unreads) => {
            const unreadsCount = {} as Record<string, number>;
            unreads.forEach((unread) => {
              if (unreadsCount[unread.room]) {
                unreadsCount[unread.room]++;
              } else {
                unreadsCount[unread.room] = 1;
              }
            });

            return roomIds.map((roomId) => {
              return unreadsCount[roomId] ?? 0;
            });
          });

        eventLog('trace', `Sending rooms to socket (${socket.id})...`);
        rooms.forEach((room, idx) => {
          eventLog(
            'trace',
            `Computing if room (${room.id}) listing (${room.listingRoomsListingTolisting.id}) is still in progress...`
          );
          const isListingInProgress =
            room.listingRoomsListingTolisting.multiple ||
            !room.listingRoomsListingTolisting.offersOffersListingTolistings.some(
              (offer) => offer.accepted
            );

          eventLog('trace', `Computing for other user's name & profile image...`);
          const otherUser =
            room.usersRoomsBuyerTousers.id === userId
              ? room.usersRoomsSellerTousers
              : room.usersRoomsBuyerTousers;

          eventLog('trace', `Computing for latest message...`);
          const latestMessage: Room['latestMessage'] =
            room.messages.length === 0
              ? undefined
              : room.messages[0].contentType === 'offer'
              ? {
                  contentType: 'offer',
                  amount: room.messages[0].offers!.amount.toNumber(),
                  content: room.messages[0].content,
                  multiple: room.listingRoomsListingTolisting.multiple,
                  offerAccepted: room.messages[0].offers!.accepted,
                }
              : {
                  contentType: room.messages[0].contentType,
                  content: room.messages[0].content,
                };

          eventLog('trace', `Mutating Room data (${room.id})...`);
          const data: Room = {
            id: room.id,
            username: otherUser.name,
            category: room.listingRoomsListingTolisting.type,
            latestMessage,
            itemName: room.listingRoomsListingTolisting.name,
            inProgress: isListingInProgress,
            time: room.messages.length === 0 ? undefined : room.messages[0].createdAt.toISOString(),
            userImage: otherUser.profilePicture ?? '',
            unreadMessages: unreads[idx],
          };

          eventLog('trace', `Sending room (${room.id}) to socket (${socket.id})...`);
          (socket.emit as TypedSocketEmitter)(EVENTS.SERVER.ROOM.SYNC, {
            status: 'in_progress',
            progress: Math.floor(((idx + 1) / rooms.length) * 100),
            data,
          });
        });

        eventLog('trace', `Informing socket (${socket.id}) that all rooms have been sent.`);
        (socket.emit as TypedSocketEmitter)(EVENTS.SERVER.ROOM.SYNC, {
          status: 'success',
        });
      })
      .catch(() => {
        eventLog('error', `Failed to retrieve rooms from database.`);

        eventLog('trace', `Acknowledging failure to socket (${socket.id})...`);
        if (typeof ack === 'function')
          ack({
            success: false,
            err: {
              message: 'Failed to retrieve rooms from database.',
            },
          });
      });
  },
});

export default event;
