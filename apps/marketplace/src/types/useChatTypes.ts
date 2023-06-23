// ** Types Imports **
import type { Dispatch, SetStateAction } from 'react';
import type { ServerRoomMessage } from '@inc/types';

// ** Hooks Params **
export interface UseChatParams {
  userId: string;
  currentRoom: string;
  messageCallback?: (message: ServerRoomMessage) => void;
}
