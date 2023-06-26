// ** Types Imports **
import type { MessageSync, Messages, Room } from '@inc/types';

// ** Hooks Params **
export interface UseChatParams {
  userId: string;
  currentRoom: string;
  // ** Room Events Callbacks **
  roomCreateCallback?: (room: Room) => void;
  roomDeleteCallback?: (roomId: string) => void;
  // ** Message Events Callbacks **
  messageCallback?: (message: Messages) => void;
  messageDeleteCallback?: (messageId: number) => void;
  messageReadCallback?: (messageIds: number[]) => void;
  messageSyncCallback?: (message: MessageSync) => void;
  chatMessagesProgressCallback?: (progress: number) => void;
  // ** Typing Events Callbacks **
  typingCallback?: (userId: string, typing: 'start' | 'stop') => void;
}
