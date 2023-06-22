import { EventFile } from '@inc/types';
import { eventLogHelper } from '../utils/logger';
import { EVENTS } from '@inc/events';
import prisma from '@/db';
import SocketUserStore from '@/store/SocketUserStore';
import RoomOccupantsStore from '@/store/RoomOccupantsStore';

const eventName = EVENTS.CLIENT.MESSAGE.DELETE;

const deleteMessage: EventFile = (io, socket) => ({
  eventName: eventName,
  type: 'on',
  callback: async (messageId, ack) => {
    const eventLog = eventLogHelper(eventName, socket);

    eventLog('trace', `Attempting to retrieve userId for socket (${socket.id}) from cache...`);
    const [, userId] = SocketUserStore.searchSocketUser('socketId', socket.id);

    eventLog('trace', `Deleting message from database...`);
    prisma.messages
      .delete({
        where: {
          id: messageId,
        },
      })
      .then(({ room: roomId }) => {
        eventLog('debug', `Deleted message from database.`);

        eventLog('trace', `Acknowledging message delete...`);
        ack({ success: true, data: { messageId } });

        eventLog('trace', `Attempting to retrieve other occupant from cache...`);
        const [, occupants] = RoomOccupantsStore.searchRoomOccupantsByRoomId(roomId);
        const otherOccupant = occupants[0] === userId ? occupants[1] : occupants[0];

        eventLog('trace', `Attempting to retrieve other occupant socketId from cache...`);
        const [otherOccupantSocketId] = SocketUserStore.searchSocketUser('userId', otherOccupant);

        eventLog(
          'trace',
          `Emitting ${EVENTS.SERVER.MESSAGE.DELETED} to ${otherOccupantSocketId}...`
        );
        io.to(otherOccupantSocketId).emit(EVENTS.SERVER.MESSAGE.DELETED, messageId);
      })
      .catch(() => {
        eventLog('error', `Failed to delete messages from database.`);
        ack({ success: false });
      });
  },
});

export default deleteMessage;
