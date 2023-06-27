import { EventFile } from '@inc/types';
import eventLogHelper from '@/utils/logger';
import { EVENTS } from '@inc/events';
import prisma from '@/db';
import { TypedSocketEmitter } from '@inc/types';
import SocketUserStore from '@/store/SocketUserStore';
import RoomOccupantsStore from '@/store/RoomOccupantsStore';

const eventName = EVENTS.CLIENT.MESSAGE.SEND;

const sendMessage: EventFile = (io, socket) => ({
  eventName: eventName,
  type: 'on',
  callback: ({ roomId, message, time }, ack) => {
    const eventLog = eventLogHelper(eventName, socket);

    eventLog('trace', `Attempting to retrieve userId for socket (${socket.id}) from cache...`);
    const [, userId] = SocketUserStore.searchSocketUser('socketId', socket.id);

    eventLog('trace', `Attempting to retrieve other occupant from cache...`);
    const [, occupants] = RoomOccupantsStore.searchRoomOccupantsByRoomId(roomId);
    const otherOccupant = occupants[0] === userId ? occupants[1] : occupants[0];

    eventLog('trace', `Attempting to retrieve other occupant socketId from cache...`);
    const [otherOccupantSocketId] = SocketUserStore.searchSocketUser('userId', otherOccupant);

    eventLog('debug', `Other occupant socketId: ${otherOccupantSocketId}`);

    eventLog('trace', `Checking for connected sockets to room (${roomId})...`);
    const connectedSockets = io.sockets.adapter.rooms.get(roomId);

    if (connectedSockets === undefined) {
      // Unlikely to even reach here, since the socket is already in the room in the client, prior to being
      // able to send a message.
      eventLog('warn', `No connected sockets to room (${roomId}).`);

      eventLog('trace', `Acknowledging message...`);
      if (typeof ack === 'function')
        ack({ success: false, err: { message: 'No connected sockets to room.' } });

      return;
    }

    eventLog('trace', `Checking if other occupant is connected...`);
    const isOtherOccupantConnected = connectedSockets.has(otherOccupantSocketId);

    eventLog('trace', `Inserting message into database...`);
    prisma.messages
      .create({
        data: {
          content: message,
          contentType: 'text',
          room: roomId,
          author: userId,
          createdAt: time,
          read: isOtherOccupantConnected,
        },
        select: {
          id: true,
          author: true,
          content: true,
          createdAt: true,
          contentType: true,
          offers: {
            select: {
              id: true,
              accepted: true,
              listingOffersListingTolisting: {
                select: {
                  multiple: true,
                },
              },
              amount: true,
            },
          },
          read: true,
          room: true,
        },
      })
      .then((message) => {
        eventLog('info', `Created new message (${message.id}) in database.`);

        eventLog('trace', `Formatting message...`);
        const data = {
          createdAt: message.createdAt.toISOString(),
          id: message.id,
          author: message.author,
          read: message.read,
          room: message.room,
          message:
            message.contentType === 'offer'
              ? {
                  contentType: message.contentType,
                  multiple: message.offers!.listingOffersListingTolisting.multiple,
                  offerAccepted: message.offers!.accepted,
                  amount: message.offers!.amount.toNumber(),
                  content: message.content,
                }
              : {
                  contentType: message.contentType,
                  content: message.content,
                },
        };

        eventLog('trace', `Acknowledging message...`);
        if (typeof ack === 'function') ack({ success: true, data });

        if (otherOccupantSocketId !== '') {
          eventLog('info', `Emitting ${EVENTS.SERVER.MESSAGE.ROOM} to ${otherOccupantSocketId}...`);
          (io.to(otherOccupantSocketId).emit as TypedSocketEmitter)(
            EVENTS.SERVER.MESSAGE.ROOM,
            data
          );
        }
      })
      .catch(() => {
        eventLog('error', `Failed to insert message into database.`);

        eventLog('trace', `Acknowledging message...`);
        if (typeof ack === 'function') ack({ success: false });
      });
  },
});

export default sendMessage;
