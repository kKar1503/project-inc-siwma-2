import { EventFile } from '@inc/types';
import { eventLogHelper } from '@/utils/logger';
import { EVENTS } from '@inc/events';
import RoomOccupantsStore from '@/store/RoomOccupantsStore';
import SocketUserStore from '@/store/SocketUserStore';

const eventName = EVENTS.CLIENT.ROOM.PART;

const partRoom: EventFile = (io, socket) => ({
  eventName: eventName,
  type: 'on',
  callback: (roomId) => {
    const eventLog = eventLogHelper(eventName, socket);

    if (!socket.rooms.has(roomId)) {
      eventLog('warn', `Not in ${roomId}.`);
      return;
    }

    // Checking if room is in cache. If not, then fetch it from db.
    eventLog('trace', `Attempting to check if room (${roomId}) is in cache...`);
    const [roomIdFromCache, [occupant1, occupant2]] =
      RoomOccupantsStore.searchRoomOccupantsByRoomId(roomId);

    if (roomIdFromCache !== '') {
      eventLog('warn', `Room (${roomId}) cannot be found in cache.`);

      eventLog('trace', `Fetching current socket userId from cache...`);
      const [, userId] = SocketUserStore.searchSocketUser('socketId', socket.id);
      eventLog('debug', `Current socket userId: ${userId}`);

      const otherOccupantId = occupant1 === userId ? occupant2 : occupant1;
      eventLog('debug', `Other occupant userId: ${otherOccupantId}`);

      eventLog('trace', `Fetching other occupant socketId from cache...`);
      const [otherOccupantSocketId, _] = SocketUserStore.searchSocketUser(
        'userId',
        otherOccupantId
      );

      const removeRoom = () => {
        eventLog('trace', `Attempting to remove room (${roomId}) from cache...`);
        const isRoomRemoved = RoomOccupantsStore.removeRoomOccupantsByRoomId(roomId);

        if (isRoomRemoved) {
          eventLog('debug', `Room (${roomId}) removed from cache.`);
        } else {
          eventLog('warn', `Room (${roomId}) not removed from cache.`);
        }
      };

      if (otherOccupantSocketId === '') {
        eventLog('debug', `Other occupant socketId cannot be found in cache.`);
        removeRoom();
      } else {
        eventLog('debug', `Other occupant socketId found in cache: ${otherOccupantSocketId}`);
        eventLog(
          'trace',
          `Checking if socket (${otherOccupantSocketId}) is connected to room (${roomId})...`
        );
        const roomOccupants = io.sockets.adapter.rooms.get(roomId);
        eventLog('debug', `Room occupants: ${[...roomOccupants]}`);

        if (!roomOccupants.has(otherOccupantSocketId)) {
          eventLog(
            'debug',
            `Socket (${otherOccupantSocketId}) is not connected to room (${roomId}).`
          );
          removeRoom();
        } else {
          eventLog('debug', `Socket (${otherOccupantSocketId}) is connected to room (${roomId}).`);
          eventLog('debug', `Room (${roomId}) not removed from cache.`);
        }
      }
    }

    socket.leave(roomId);
    eventLog('info', `Left ${roomId}.`);
  },
});

export default partRoom;
