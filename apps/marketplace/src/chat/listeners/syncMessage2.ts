// ** Types Imports **
import type { ClientEventFile } from '@inc/types';
import type { UseChatParams } from '@/types/useChatTypes';

// ** Events Imports **
import { EVENTS } from '@inc/events';

// ** Event File **
const event: ClientEventFile<UseChatParams> = (_, hookParams, setLoading) => ({
  eventName: EVENTS.SERVER.MESSAGE.SYNC2,
  type: 'on', // 'on' | 'once'
  callback: (messageSync) => {
    const { chatMessagesProgressCallback, messageSyncCallback } = hookParams;

    if (messageSync.status === 'success') {
      setLoading('idle');
    }

    if (messageSync.status === 'in_progress') {
      setLoading('sync');
    }

    if (messageSync.status === 'in_progress' && chatMessagesProgressCallback !== undefined) {
      chatMessagesProgressCallback(messageSync.progress);
    }

    if (messageSyncCallback !== undefined) {
      messageSyncCallback(messageSync);
    }
  },
});

export default event;
