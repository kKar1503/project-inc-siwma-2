import { EventFile, TypedSocketEmitter } from '@inc/types';
import eventLogHelper from '@/utils/logger';
import { EVENTS } from '@inc/events';
import prisma from '@/db';
import SocketUserStore from '@/store/SocketUserStore';

const eventName = EVENTS.CLIENT.ROOM.DELETE;

const deleteRoom: EventFile = (io, socket) => ({
  eventName: eventName,
  type: 'on',
  callback: (roomId, ack) => {
    const eventLog = eventLogHelper(eventName, socket);

    eventLog('trace', `Attempting to retrieve userId for socket (${socket.id}) from cache...`);
    const [, userId] = SocketUserStore.searchSocketUser('socketId', socket.id);

    eventLog('trace', `Attempting to delete room (${roomId}) from database...`);
    prisma.rooms
      .delete({
        where: {
          id: roomId,
        },
      })
      .then(({ buyer, seller }) => {
        eventLog('info', `Room (${roomId}) deleted from database.`);

        eventLog('trace', `Acknowledging room (${roomId}) deleted from database...`);
        if (typeof ack === 'function') ack({ success: true });

        eventLog('trace', `Retrieving socketId for other occupant (${userId})...`);
        const otherOccupant = buyer === userId ? seller : buyer;
        const [otherOccupantSocketId] = SocketUserStore.searchSocketUser('userId', otherOccupant);

        eventLog('info', `Emitting ${EVENTS.SERVER.ROOM.DELETED} to (${otherOccupantSocketId})...`);
        (io.to(otherOccupantSocketId).emit as TypedSocketEmitter)(
          EVENTS.SERVER.ROOM.DELETED,
          roomId
        );
      })
      .catch(() => {
        eventLog('error', `Failed to delete room (${roomId}) from database.`);

        eventLog('trace', `Acknowledging failed to delete room (${roomId}) from database...`);
        if (typeof ack === 'function')
          ack({ success: false, err: { message: 'Failed to delete room from database.' } });
      });
  },
});

export default deleteRoom;
