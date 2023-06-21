import { EventFile } from '@inc/types';
import { eventLogHelper } from '../utils/logger';
import { EVENTS } from '@inc/events';
import RoomOccupantsStore from '../store/RoomOccupantsStore';
import prisma from '@/db';

const eventName = EVENTS.CLIENT.ROOM.JOIN;

const joinRoom: EventFile = (_, socket) => ({
  eventName: eventName,
  type: 'on',
  callback: (roomId) => {
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
      prisma.rooms
        .findFirst({
          select: {
            seller: true,
            buyer: true,
          },
          where: {
            id: roomId,
          },
        })
        .then(({ seller, buyer }) => {
          eventLog('trace', `Room (${roomId}) fetched from db.`);
          eventLog('debug', `Occupants fetched from db: ${buyer}, ${seller}`);

          eventLog('trace', `Adding room (${roomId}) to cache...`);
          RoomOccupantsStore.addRoomOccupants(roomId, [buyer, seller]);
        });
    }

    socket.join(roomId);
    eventLog('info', `Joined ${roomId}.`);
  },
});

export default joinRoom;
