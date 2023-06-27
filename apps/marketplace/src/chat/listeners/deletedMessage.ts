// ** Types Imports **
import type { ClientEventFile } from '@inc/types';
import type { UseChatParams } from '@/types/useChatTypes';

// ** Events Imports **
import { EVENTS } from '@inc/events';

// ** Event File **
const event: ClientEventFile<UseChatParams> = (_, hookParams) => ({
  eventName: EVENTS.SERVER.MESSAGE.DELETED,
  type: 'on', // 'on' | 'once'
  callback: (messageId) => {
    const { messageDeleteCallback } = hookParams;

    if (messageDeleteCallback !== undefined) {
      messageDeleteCallback(messageId);
    }
  },
});

export default event;
