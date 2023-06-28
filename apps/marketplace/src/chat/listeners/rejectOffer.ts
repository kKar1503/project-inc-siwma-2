// ** Types Imports **
import type { ClientEventFile } from '@inc/types';
import type { UseChatParams } from '@/types/useChatTypes';

// ** Events Imports **
import { EVENTS } from '@inc/events';

// ** Event File **
const event: ClientEventFile<UseChatParams> = (_, hookParams) => ({
  eventName: EVENTS.SERVER.OFFER.REJECT,
  type: 'on', // 'on' | 'once'
  callback: (messageId) => {
    const { offerCallback } = hookParams;

    if (offerCallback !== undefined) {
      offerCallback(messageId, 'reject');
    }
  },
});

export default event;
