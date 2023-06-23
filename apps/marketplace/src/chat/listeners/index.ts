// ** Types Imports **
import type { UseChatParams } from '@/types/useChatTypes';
import type { ClientEventFile } from '@inc/types';

// ** Event Listeners Imports **
import roomMessage from './roomMessage';

// ** Event Listeners Compilation **
const listeners: Record<string, ClientEventFile<UseChatParams>> = {
  roomMessage,
};

export default listeners;
