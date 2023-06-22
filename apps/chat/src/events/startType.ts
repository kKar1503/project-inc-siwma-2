import { EventFile, TypedSocketEmitter } from '@inc/types';
import eventLogHelper from '@/utils/logger';
import { EVENTS } from '@inc/events';
import RoomOccupantsStore from '@/store/RoomOccupantsStore';
import SocketUserStore from '@/store/SocketUserStore';

const eventName = EVENTS.CLIENT.TYPING.START;

const startType: EventFile = (io, socket) => ({
  eventName: eventName,
  type: 'on',
  callback: (roomId) => {
    const eventLog = eventLogHelper(eventName, socket);

    eventLog('trace', `Checking if cache contains room (${roomId})...`);
    const [roomIdFromCache, occupantsFromCache] =
      RoomOccupantsStore.searchRoomOccupantsByRoomId(roomId);

    if (roomIdFromCache === '') {
      eventLog('debug', `Room (${roomId}) cannot be found in cache.`);
      eventLog('error', `Disconnecting socket... Reason: Missing room cache (${roomId})`);
      socket.disconnect(true);
      return;
    }

    eventLog('debug', `Occupants found from cache: ${occupantsFromCache}`);
    const otherOccupant =
      occupantsFromCache[0] === socket.id ? occupantsFromCache[1] : occupantsFromCache[0];

    eventLog('debug', `Other occupant userId: ${otherOccupant}`);
    const [otherOccupantSocketId, _] = SocketUserStore.searchSocketUser('userId', otherOccupant);
    eventLog('debug', `Other occupant socketId: ${otherOccupantSocketId}`);

    eventLog('info', `Emitting ${EVENTS.SERVER.TYPING.START} to ${otherOccupantSocketId}...`);
    (io.to(otherOccupantSocketId).emit as TypedSocketEmitter)(
      EVENTS.SERVER.TYPING.START,
      otherOccupantSocketId
    );
  },
});

export default startType;
