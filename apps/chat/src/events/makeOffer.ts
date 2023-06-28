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
import e from 'express';

// ** Event Name **
const eventName = EVENTS.CLIENT.OFFER.MAKE;

// ** Event File **
const event: EventFile = (io, socket) => ({
  eventName: eventName,
  type: 'on', // 'on' | 'once'
  callback: ({ amount, roomId, listingId, userId }, ack) => {
    // ** Event Logger **
    const eventLog = eventLogHelper(eventName, socket);

    // ** Event Implementation **
    eventLog('debug', `Offer userId: ${userId}`);
    eventLog('debug', `Offer roomId: ${roomId}`);
    eventLog('debug', `Offer listingId: ${listingId}`);
    eventLog('debug', `Offer amount: ${amount}`);

    eventLog('trace', `Attempting to create offer in database...`);
    prisma.offers
      .create({
        data: {
          listing: listingId,
          amount: amount,
          messages: {
            create: {
              room: roomId,
              author: userId,
              contentType: 'offer',
              content: '',
            },
          },
        },
        select: {
          id: true,
          messages: {
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
              rooms: {
                select: {
                  id: true,
                  buyer: true,
                  seller: true,
                },
              },
            },
          },
        },
      })
      .then((offer) => {
        eventLog('debug', `Offer created: ${offer.id}`);

        eventLog('trace', `Formatting message...`);
        const message = offer.messages[0];
        const data = {
          createdAt: message.createdAt.toISOString(),
          id: message.id,
          author: message.author,
          read: message.read,
          room: message.rooms.id,
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

        eventLog('trace', `Acknowledging offer...`);
        if (typeof ack === 'function') ack({ success: true, data });

        eventLog('trace', `Deriving other occupant user id...`);
        const otherOccupantUserId =
          message.rooms.buyer === userId ? message.rooms.seller : message.rooms.buyer;

        eventLog('trace', `Deriving other occupant socket id...`);
        const [otherOccupantSocketId] = SocketUserStore.searchSocketUser(
          'userId',
          otherOccupantUserId
        );

        eventLog('debug', `Other occupant socket id: ${otherOccupantSocketId}`);

        if (otherOccupantSocketId !== '') {
          eventLog('info', `Emitting ${EVENTS.SERVER.MESSAGE.ROOM} to ${otherOccupantSocketId}...`);
          (io.to(otherOccupantSocketId).emit as TypedSocketEmitter)(
            EVENTS.SERVER.MESSAGE.ROOM,
            data
          );
        }
      })
      .catch((err) => {
        eventLog('error', `Error creating offer: ${err}`);

        eventLog('trace', `Acknowledging offer...`);
        if (typeof ack === 'function')
          ack({ success: false, err: { message: 'Error creating offer.' } });
      });
  },
});

export default event;
