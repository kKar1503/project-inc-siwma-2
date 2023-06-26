// ** Types Imports **
import type { UseChatParams } from '@/types/useChatTypes';
import type { ClientEventFile } from '@inc/types';

// ** Event Listeners Imports **
import roomMessage from './roomMessage';
import syncMessage from './syncMessage';
import syncMessage2 from './syncMessage2';
import createdRoom from './createdRoom';

// ** Event Listeners Compilation **
const listeners: Record<string, ClientEventFile<UseChatParams>> = {
  roomMessage,
  syncMessage,
  syncMessage2,
  createdRoom,
};

export default listeners;
