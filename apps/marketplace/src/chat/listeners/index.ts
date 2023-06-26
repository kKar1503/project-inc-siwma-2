// ** Types Imports **
import type { UseChatParams } from '@/types/useChatTypes';
import type { ClientEventFile } from '@inc/types';

// ** Event Listeners Imports **
import createdRoom from './createdRoom';
import deletedRoom from './deletedRoom';
import syncRooms from './syncRooms';
import roomMessage from './roomMessage';
import deletedMessage from './deletedMessage';
import readMessage from './readMessage';
import syncMessage from './syncMessage';
import syncMessage2 from './syncMessage2';
import startType from './startType';
import stopType from './stopType';

// ** Event Listeners Compilation **
const listeners: Record<string, ClientEventFile<UseChatParams>> = {
  createdRoom,
  deletedRoom,
  syncRooms,
  roomMessage,
  deletedMessage,
  readMessage,
  syncMessage,
  syncMessage2,
  startType,
  stopType,
};

export default listeners;
