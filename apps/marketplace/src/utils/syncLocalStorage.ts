import type { Messages } from '@inc/types';

/**
 * Syncs message to local storage.
 *
 * Currently, this is only a forward sync, meaning that it will only sync new
 * messages that are after the last message that was synced.
 *
 * This will not account for messages that were deleted or edited.
 */
const syncLocalStorage = (
  userId: string,
  message: Messages,
  lastMessagesCache?: Map<string, string>
) => {
  const { room, ...messageNoRoom } = message;

  let existingMessages = localStorage.getItem(room);

  if (existingMessages === null) {
    existingMessages = '[';
  } else {
    existingMessages = `${existingMessages.slice(0, -1)},`;
  }

  const strMessage = JSON.stringify(messageNoRoom);

  if (lastMessagesCache !== undefined) lastMessagesCache.set(room, strMessage);
  localStorage.setItem(room, `${existingMessages}${strMessage}]`);
  localStorage.setItem(`${userId}-lastMessageId`, JSON.stringify(message.id));
  window.dispatchEvent(new Event('local-storage'));
};

export const syncRooms = (userId: string, rooms: Set<string> | string) => {
  const existingRooms = localStorage.getItem(`${userId}-rooms`);

  if (existingRooms === null) {
    localStorage.setItem(
      `${userId}-rooms`,
      typeof rooms === 'string' ? JSON.stringify([rooms]) : JSON.stringify([...rooms])
    );
    window.dispatchEvent(new Event('local-storage'));
  } else {
    const existingRoomsSet = new Set<string>(JSON.parse(existingRooms));

    if (typeof rooms === 'string') {
      if (!existingRoomsSet.has(rooms)) {
        localStorage.setItem(`${userId}-rooms`, JSON.stringify([...existingRoomsSet, rooms]));
        window.dispatchEvent(new Event('local-storage'));
      }
    } else {
      rooms.forEach((room) => {
        if (!existingRoomsSet.has(room)) {
          existingRoomsSet.add(room);
        }
      });

      localStorage.setItem(`${userId}-rooms`, JSON.stringify([...existingRoomsSet]));
      window.dispatchEvent(new Event('local-storage'));
    }
  }
};

/**
 * Sync the last messages of each room to local storage.
 *
 * Use this function after all the messages have been synced on the "success"
 * status.
 */
export const syncLastMessages = (userId: string, lastMessagesCache: Map<string, string>) => {
  const roomSet = new Set<string>();
  lastMessagesCache.forEach((message, room) => {
    localStorage.setItem(`${room}-last`, message);
    if (!roomSet.has(room)) roomSet.add(room);
  });

  syncRooms(userId, roomSet);

  window.dispatchEvent(new Event('local-storage'));
};

export const syncLastMessage = (userId: string, message: Messages) => {
  const { room, ...rest } = message;
  syncLocalStorage(userId, message);
  syncRooms(userId, room);
  localStorage.setItem(`${room}-last`, JSON.stringify(rest));
  window.dispatchEvent(new Event('local-storage'));
};

export default syncLocalStorage;
