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
const eventName = EVENTS.CLIENT.OFFER.ACCEPT;

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
      .findFirst({
        where: {
          id: messageId,
        },
        select: {
          offer: true,
        },
      })
      .then((message) => {
        eventLog('debug', `Message (${messageId}) found from database: ${JSON.stringify(message)}`);

        if (message === null) {
          eventLog('warn', `Message (${messageId}) not found from database.`);

          eventLog('trace', `Acknowledging offer...`);
          if (typeof ack === 'function')
            ack({ success: false, err: { message: 'Message not found.' } });

          return;
        }

        if (message.offer === null) {
          eventLog('warn', `Message (${messageId}) does not have an offer.`);

          eventLog('trace', `Acknowledging offer...`);
          if (typeof ack === 'function')
            ack({ success: false, err: { message: 'Message does not have an offer.' } });

          return;
        }

        prisma.offers
          .update({
            where: {
              id: message.offer,
            },
            data: {
              accepted: true,
              messages: {
                update: {
                  where: {
                    id: message.offer,
                  },
                  data: {
                    content: '(Accepted)',
                  },
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
            eventLog('debug', `Offer (${offer.id}) updated in database: ${JSON.stringify(offer)}`);

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

            eventLog('trace', `Deriving other occupant socket id...`);
            const [otherOccupantSocketId] = SocketUserStore.searchSocketUser(
              'userId',
              message.author
            );

            eventLog('debug', `Other occupant socket id: ${otherOccupantSocketId}`);

            if (otherOccupantSocketId !== '') {
              eventLog(
                'info',
                `Emitting ${EVENTS.SERVER.OFFER.ACCEPT} to ${otherOccupantSocketId}...`
              );
              (io.to(otherOccupantSocketId).emit as TypedSocketEmitter)(
                EVENTS.SERVER.OFFER.ACCEPT,
                messageId
              );
            }
          })
          .catch((err) => {
            eventLog('error', `Error updating offer: ${err}`);

            eventLog('trace', `Acknowledging offer...`);
            if (typeof ack === 'function')
              ack({ success: false, err: { message: 'Error updating offer.' } });
          });
      })
      .catch((err) => {
        eventLog('error', `Error finding message: ${err}`);

        eventLog('trace', `Acknowledging offer...`);
        if (typeof ack === 'function')
          ack({ success: false, err: { message: 'Error finding message.' } });
      });
  },
});

export default event;
