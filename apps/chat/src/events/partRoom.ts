import { EventFile } from '@inc/types';
import logger, { eventLogHelper } from '../utils/logger';
import { EVENTS } from '@inc/events';

const eventName = EVENTS.CLIENT.ROOM.PART;

const startType: EventFile = (io, socket) => ({
  eventName: eventName,
  type: 'on',
  callback: (roomId) => {
    const eventLog = eventLogHelper(eventName, socket);

    if (socket.rooms.has(roomId)) {
      socket.leave(roomId);
      eventLog('info', `Left ${roomId}.`);
    } else {
      eventLog('warn', `Not in ${roomId}.`);
    }
  },
});

export default startType;
