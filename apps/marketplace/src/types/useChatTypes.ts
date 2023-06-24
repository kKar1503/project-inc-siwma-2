// ** Types Imports **
import type { MessageSync, Messages } from '@inc/types';

// ** Hooks Params **
export interface UseChatParams {
  userId: string;
  currentRoom: string;
  chatMessagesProgressCallback?: (progress: number) => void;
  messageCallback?: (message: Messages) => void;
  messageSyncCallback?: (message: MessageSync) => void;
}
