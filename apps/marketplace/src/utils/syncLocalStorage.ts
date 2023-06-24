import { Messages } from '@inc/types';

/**
 * Syncs message to local storage.
 *
 * Currently, this is only a forward sync, meaning that it will only sync new
 * messages that are after the last message that was synced.
 *
 * This will not account for messages that were deleted or edited.
 */
export default (message: Messages) => {
  const { room } = message;
  let existingMessages = localStorage.getItem(room);
  if (existingMessages === null) {
    existingMessages = '[';
  } else {
    existingMessages = existingMessages.slice(0, -1) + ',';
  }
  localStorage.setItem(room, existingMessages + JSON.stringify(message) + ']');
  localStorage.setItem('lastMessageId', JSON.stringify(message.id));
};
