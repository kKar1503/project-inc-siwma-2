// ** Types Imports **
import type { MessageSync, Messages, Room, RoomSync } from '@inc/types';
import { MutableRefObject } from 'react';

// ** Hooks Params **
export interface UseChatParams {
  userId: string;
  currentRoom: MutableRefObject<string>;
  // ** Room Events Callbacks **
  roomCreateCallback?: (room: Room) => void;
  roomDeleteCallback?: (roomId: string) => void;
  roomSyncCallback?: (room: RoomSync) => void;
  // ** Message Events Callbacks **
  messageCallback?: (message: Messages) => void;
  messageUnreadCallback?: (message: Messages) => void;
  messageDeleteCallback?: (messageId: number) => void;
  messageReadCallback?: (messageIds: number[]) => void;
  messageSyncCallback?: (message: MessageSync) => void;
  chatMessagesProgressCallback?: (progress: number) => void;
  // ** Typing Events Callbacks **
  typingCallback?: (userId: string, typing: 'start' | 'stop') => void;
}
