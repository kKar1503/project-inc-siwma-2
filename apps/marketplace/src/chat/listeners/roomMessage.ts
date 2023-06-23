// ** Types Imports **
import type { ClientEventFile, TypedSocketEmitter } from '@inc/types';
import type { UseChatParams } from '@/types/useChatTypes';

// ** Events Imports **
import { EVENTS } from '@inc/events';

// ** Event Name **
const eventName = EVENTS.SERVER.MESSAGE.ROOM;

// ** Event File **
const event: ClientEventFile<UseChatParams> = (io, hookParams) => ({
  eventName: eventName,
  type: 'on', // 'on' | 'once'
  callback: (roomMessage) => {
    const { currentRoom, messageCallback } = hookParams;

    if (messageCallback !== undefined) {
      messageCallback(roomMessage);
    }

    if (currentRoom === roomMessage.roomId) {
      (io.emit as TypedSocketEmitter)(EVENTS.CLIENT.MESSAGE.READ, roomMessage.roomId);
    }
  },
});

export default event;
