// ** Types Imports **
import type { ClientEventFile } from '@inc/types';
import type { UseChatParams } from '@/types/useChatTypes';

// ** Events Imports **
import { EVENTS } from '@inc/events';

// ** Event File **
const event: ClientEventFile<UseChatParams> = (_, hookParams, setLoading) => ({
  eventName: EVENTS.SERVER.ROOM.SYNC,
  type: 'on', // 'on' | 'once'
  callback: (roomSync) => {
    const { roomSyncCallback } = hookParams;

    if (roomSync.status === 'success') {
      setLoading('idle');
    }

    if (roomSync.status === 'in_progress') {
      setLoading('sync');
    }

    // if (roomSync.status === 'in_progress' && chatMessagesProgressCallback !== undefined) {
    //   chatMessagesProgressCallback(roomSync.progress);
    // }

    if (roomSyncCallback !== undefined) {
      roomSyncCallback(roomSync);
    }
  },
});

export default event;
