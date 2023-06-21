import { EventFile, TypedSocketEmitter } from '@inc/types';
import { eventLogHelper } from '../utils/logger';
import { EVENTS } from '@inc/events';

const eventName = EVENTS.CLIENT.TYPING.START;

const startType: EventFile = (io, socket) => ({
  eventName: eventName,
  type: 'on',
  callback: () => {
    eventLogHelper(eventName, socket);
    (io.to('testRoom').emit as TypedSocketEmitter)(EVENTS.SERVER.TYPING.START, 'testRoom');
  },
});

export default startType;
