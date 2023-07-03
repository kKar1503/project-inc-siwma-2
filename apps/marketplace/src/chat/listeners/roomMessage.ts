// ** Types Imports **
import type { ClientEventFile, TypedSocketEmitter } from '@inc/types';
import type { UseChatParams } from '@/types/useChatTypes';

// ** Events Imports **
import { EVENTS } from '@inc/events';

// ** Event File **
const event: ClientEventFile<UseChatParams> = (io, hookParams) => ({
  eventName: EVENTS.SERVER.MESSAGE.ROOM,
  type: 'on', // 'on' | 'once'
  callback: (roomMessage) => {
    const { currentRoom, messageCallback, messageUnreadCallback } = hookParams;

    console.log('current', currentRoom);

    if (messageCallback !== undefined && currentRoom.current === roomMessage.room) {
      messageCallback(roomMessage);
    }

    if (messageUnreadCallback !== undefined && currentRoom.current !== roomMessage.room) {
      messageUnreadCallback(roomMessage);
    }

    if (currentRoom.current === roomMessage.room) {
      (io.emit as TypedSocketEmitter)(EVENTS.CLIENT.MESSAGE.READ, roomMessage.room);
    }
  },
});

export default event;
