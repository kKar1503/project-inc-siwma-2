// ** Types Imports **
import type { ClientEventFile } from '@inc/types';
import type { UseChatParams } from '@/types/useChatTypes';

// ** Events Imports **
import { EVENTS } from '@inc/events';

// ** Event File **
const event: ClientEventFile<UseChatParams> = (_, hookParams) => ({
  eventName: EVENTS.SERVER.MESSAGE.READ,
  type: 'on', // 'on' | 'once'
  callback: (messageIds) => {
    const { messageReadCallback } = hookParams;

    if (messageReadCallback !== undefined) {
      messageReadCallback(messageIds);
    }
  },
});

export default event;
