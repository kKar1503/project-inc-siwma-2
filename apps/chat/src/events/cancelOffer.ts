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
const eventName = EVENTS.CLIENT.OFFER.CANCEL;

// ** Event File **
const event: EventFile = (io, socket) => ({
  eventName: eventName,
  type: 'on', // 'on' | 'once'
  callback: (messageId, ack) => {
    // ** Event Logger **
    const eventLog = eventLogHelper(eventName, socket);

    // ** Event Implementation **
    eventLog('debug', `Offer messageId: ${messageId}`);

    eventLog('trace', `Attempting to find message (${messageId}) in database...`);
    prisma.messages
      .delete({
        where: {
          id: messageId,
        },
        select: {
          id: true,
          author: true,
          rooms: {
            select: {
              buyer: true,
              seller: true,
            },
          },
        },
      })
      .then((message) => {
        eventLog(
          'debug',
          `Message (${message.id}) deleted from database: ${JSON.stringify(message.id)}`
        );

        eventLog('trace', `Acknowledging offer...`);
        if (typeof ack === 'function') ack({ success: true, data: message.id });

        eventLog('trace', `Deriving other occupant user id...`);
        const otherOccupantUserId =
          message.rooms.buyer === message.author ? message.rooms.seller : message.rooms.buyer;

        eventLog('trace', `Deriving other occupant socket id...`);
        const [otherOccupantSocketId] = SocketUserStore.searchSocketUser(
          'userId',
          otherOccupantUserId
        );

        eventLog('debug', `Other occupant socket id: ${otherOccupantSocketId}`);

        if (otherOccupantSocketId !== '') {
          eventLog('info', `Emitting ${EVENTS.SERVER.OFFER.CANCEL} to ${otherOccupantSocketId}...`);
          (io.to(otherOccupantSocketId).emit as TypedSocketEmitter)(
            EVENTS.SERVER.OFFER.CANCEL,
            message.id
          );
        }
      })
      .catch((err) => {
        eventLog('error', `Error deleting message: ${err}`);

        eventLog('trace', `Acknowledging offer...`);
        if (typeof ack === 'function')
          ack({ success: false, err: { message: 'Error deleting message.' } });
      });
  },
});

export default event;
