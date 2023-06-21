import { EventFile, TypedSocketEmitter } from '@inc/types';
import { eventLogHelper } from '../utils/logger';
import { EVENTS } from '@inc/events';
import RoomOccupantsStore from '../store/RoomOccupantsStore';
import SocketUserStore from '../store/SocketUserStore';

const eventName = EVENTS.CLIENT.TYPING.START;

const startType: EventFile = (io, socket) => ({
  eventName: eventName,
  type: 'on',
  callback: () => {
    const eventLog = eventLogHelper(eventName, socket);

    const rooms = [...socket.rooms];
    let otherOccupant: string;

    // Validate the rooms variable is correct
    eventLog('trace', 'Validating sockets.room is size 2...');
    if (socket.rooms.size !== 2) {
      if (
        socket.rooms.size > 2 ||
        (socket.rooms.size === 1 && rooms[0] === socket.id) ||
        socket.rooms.size < 1
      ) {
        eventLog(
          'error',
          `Disconnecting socket... Reason: Invalid socket room size (${socket.rooms.size})`
        );
        socket.disconnect(true);
        return;
      }

      // Attempt to check if the room is a valid room through cache
      const roomId = rooms[0];
      eventLog('trace', `Checking if cache contains room (${roomId})...`);
      const [roomIdFromCache, occupantsFromCache] =
        RoomOccupantsStore.searchRoomOccupantsByRoomId(roomId);

      if (roomIdFromCache === '') {
        eventLog('debug', `Room (${roomId}) cannot be found in cache...`);
        eventLog('error', `Disconnecting socket... Reason: Missing room cache (${roomId})`);
        socket.disconnect(true);
        return;
      }

      eventLog('trace', `Room (${roomId}) found from cache...`);
      eventLog('debug', `Occupants found from cache: ${occupantsFromCache}...`);
      otherOccupant =
        occupantsFromCache[0] === socket.id ? occupantsFromCache[1] : occupantsFromCache[0];
    }

    eventLog('debug', `Other occupant userId: ${otherOccupant}...`);
    const [otherOccupantSocketId, _] = SocketUserStore.searchSocketUser('userId', otherOccupant);
    eventLog('debug', `Other occupant socketId: ${otherOccupantSocketId}...`);

    eventLog('info', `Emitting ${EVENTS.SERVER.TYPING.START} to ${otherOccupantSocketId}...`);
    (io.to(otherOccupantSocketId).emit as TypedSocketEmitter)(
      EVENTS.SERVER.TYPING.START,
      otherOccupantSocketId
    );
  },
});

export default startType;
