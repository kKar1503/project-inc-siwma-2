// ** Types Imports **
import type { MessageSync, ServerRoomMessage } from '@inc/types';

// ** Hooks Params **
export interface UseChatParams {
  userId: string;
  currentRoom: string;
  chatMessagesProgressCallback: (progress: number) => void;
  messageCallback?: (message: ServerRoomMessage) => void;
  messageSyncCallback?: (message: MessageSync) => void;
}
