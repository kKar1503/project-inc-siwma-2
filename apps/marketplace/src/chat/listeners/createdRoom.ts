// ** Types Imports **
import type { ClientEventFile } from '@inc/types';
import type { UseChatParams } from '@/types/useChatTypes';

// ** Events Imports **
import { EVENTS } from '@inc/events';

// ** Event File **
const event: ClientEventFile<UseChatParams> = (io, hookParams) => ({
  eventName: EVENTS.SERVER.ROOM.CREATED,
  type: 'on', // 'on' | 'once'
  callback: (room) => {
    const { roomCreateCallback } = hookParams;

    if (roomCreateCallback !== undefined) {
      roomCreateCallback(room);
    }
  },
});

export default event;
