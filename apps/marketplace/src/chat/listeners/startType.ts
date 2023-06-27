// ** Types Imports **
import type { ClientEventFile } from '@inc/types';
import type { UseChatParams } from '@/types/useChatTypes';

// ** Events Imports **
import { EVENTS } from '@inc/events';

// ** Event File **
const event: ClientEventFile<UseChatParams> = (_, hookParams) => ({
  eventName: EVENTS.SERVER.TYPING.START,
  type: 'on', // 'on' | 'once'
  callback: (userId) => {
    const { typingCallback } = hookParams;

    if (typingCallback !== undefined) {
      typingCallback(userId, 'start');
    }
  },
});

export default event;
