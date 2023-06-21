import { EventFile } from '@inc/types';
import { eventLogHelper } from '../utils/logger';
import { EVENTS } from '@inc/events';
import crypto from 'node:crypto';

const eventName = EVENTS.CLIENT.ROOM.CREATE;

const startType: EventFile = (_, socket) => ({
  eventName: eventName,
  type: 'on',
  callback: (userId) => {
    const eventLog = eventLogHelper(eventName, socket);

    // TODO: Create the room and get the ID back from db
    const roomId = crypto.randomUUID();
  },
});

export default startType;
