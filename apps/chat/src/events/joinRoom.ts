import { EventFile } from '@inc/types';
import logger, { eventLogHelper } from '../utils/logger';
import { EVENTS } from '@inc/events';
import RoomOccupantsStore from '../store/RoomOccupantsStore';
import prisma from '@/db';

const eventName = EVENTS.CLIENT.ROOM.JOIN;

const joinRoom: EventFile = (_, socket) => ({
  eventName: eventName,
  type: 'on',
  callback: async (roomId) => {
    const eventLog = eventLogHelper(eventName, socket);

    if (socket.rooms.has(roomId)) {
      eventLog('warn', `Already in ${roomId}.`);
      return;
    }

    // Checking if room is in cache. If not, then fetch it from db.
    eventLog('trace', `Attempting to check if room (${roomId}) is in cache.`);
    const [roomIdFromCache, _] = RoomOccupantsStore.searchRoomOccupantsByRoomId(roomId);

    if (roomIdFromCache === '') {
      eventLog('debug', `Room (${roomId}) cannot be found in cache...`);

      eventLog('trace', `Attempting to fetch room (${roomId}) from db...`);
      prisma.users.findMany().then((users) => {
        console.log(users);
      });
    }

    socket.join(roomId);
    eventLog('info', `Joined ${roomId}.`);
  },
});

export default joinRoom;
