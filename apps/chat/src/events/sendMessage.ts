import { EventFile } from '@inc/types';
import { eventLogHelper } from '@/utils/logger';
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

    eventLog('trace', `Inserting message into database...`);
    prisma.messages
      .create({
        data: {
          content: message,
          contentType: 'text',
          room: roomId,
          author: userId,
          createdAt: time,
        },
      })
      .then(({ id }) => {
        eventLog('debug', `Message inserted into database: ${id}`);

        eventLog('trace', `Acknowledging message...`);
        ack({ success: true, data: { id } });

        eventLog('trace', `Emitting ${EVENTS.SERVER.MESSAGE.ROOM} to ${otherOccupantSocketId}...`);
        (io.to(otherOccupantSocketId).emit as TypedSocketEmitter)(EVENTS.SERVER.MESSAGE.ROOM, {
          id,
          message,
          roomId,
          time,
        });
      })
      .catch(() => {
        eventLog('error', `Failed to insert message into database.`);

        eventLog('trace', `Acknowledging message...`);
        ack({ success: false });
      });
  },
});

export default sendMessage;
