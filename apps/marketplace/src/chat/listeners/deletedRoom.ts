// ** Types Imports **
import type { ClientEventFile } from '@inc/types';
import type { UseChatParams } from '@/types/useChatTypes';

// ** Events Imports **
import { EVENTS } from '@inc/events';

// ** Event File **
const event: ClientEventFile<UseChatParams> = (_, hookParams) => ({
  eventName: EVENTS.SERVER.ROOM.DELETED,
  type: 'on', // 'on' | 'once'
  callback: (roomId) => {
    const { roomDeleteCallback } = hookParams;

    if (roomDeleteCallback !== undefined) {
      roomDeleteCallback(roomId);
    }
  },
});

export default event;
