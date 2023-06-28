// ** Types Imports **
import type { ClientEventFile } from '@inc/types';
import type { UseChatParams } from '@/types/useChatTypes';

// ** Events Imports **
import { EVENTS } from '@inc/events';

// ** Event File **
const event: ClientEventFile<UseChatParams> = (_, hookParams) => ({
  eventName: EVENTS.SERVER.OFFER.ACCEPT,
  type: 'on', // 'on' | 'once'
  callback: (messageId) => {
    const { offerCallback } = hookParams;

    if (offerCallback !== undefined) {
      offerCallback(messageId, 'accept');
    }
  },
});

export default event;
