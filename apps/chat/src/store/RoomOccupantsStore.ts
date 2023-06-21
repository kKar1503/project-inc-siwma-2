import logger from '@/utils/logger';
import OccupantsSet, { Occupants } from './OccupantsSet';

class RoomOccupantsStore {
  private roomSet: Set<string>;
  private usersSet: OccupantsSet;

  constructor() {}

  init() {
    this.roomSet = new Set<string>();
    this.usersSet = new OccupantsSet();
  }

  reset() {
    this.roomSet.clear();
    this.usersSet.clear();
  }

  /**
   * This method adds the room and occupants pair into the cache. Returns the
   * zero-based index of the insertion, -1 if room or occupants already exist.
   */
  addRoomOccupants = (roomId: string, userIds: Occupants) => {
    logger.trace(`addRoomOccupants() | Checking if socketId (${roomId}) already exist in cache...`);
    if (this.roomSet.has(roomId)) {
      logger.warn(`socketId (${roomId}) already exist in cache.`);
      return -1;
    }

    logger.trace(`addRoomOccupants() | Adding userId (${userIds}) to userSet...`);
    const areUsersAdded = this.usersSet.add(userIds);

    if (areUsersAdded) {
      logger.trace(`addRoomOccupants() | userId (${userIds}) not added...`);
      logger.warn(`userId (${userIds}) already exist in cache.`);
      return -1;
    }

    logger.trace(`addRoomOccupants() | Adding socketId (${roomId}) to socketSet...`);
    this.roomSet.add(roomId);

    logger.debug(`addRoomOccupants() | Index inserted in socketSet: ${this.roomSet.size - 1}.`);
    logger.debug(`addRoomOccupants() | Index inserted in userSet: ${this.usersSet.size - 1}.`);
    return this.roomSet.size - 1;
  };

  /**
   * This method removes the room and occupants pair from the cache. Returns true
   * if the pair has been successfully removed, false if pair either does not exist in
   * cache, cannot be removed.
   */
  removeRoomOccupantsByRoomId = (roomId: string) => {
    logger.trace(`removeRoomOccupantsByRoomId() | Searching for roomId occupants pair...`);
    const [, occupants] = this.searchRoomOccupantsByRoomId(roomId);

    if (occupants[0] === '') return false;

    logger.trace(
      `removeRoomOccupantsByRoomId() | Removing occupants (${occupants}) from usersSet...`
    );
    const areUsersRemoved = this.usersSet.delete(occupants);
    logger.trace(`removeRoomOccupantsByRoomId() | Removing roomId (${roomId}) from roomSet...`);
    const isRoomRemoved = this.roomSet.delete(roomId);

    return areUsersRemoved && isRoomRemoved;
  };

  /**
   * This method searches for the room and occupants pair from the cache. Returns the
   * tuple values of the roomId and occupants' Ids. If the search fails, the tuple values
   * returned will be empty strings.
   */
  searchRoomOccupantsByRoomId = (roomId: string): [RoomId: string, Occupants: Occupants] => {
    logger.trace(
      `searchRoomOccupantsByRoomId() | Checking if roomId (${roomId}) exist in cache...`
    );
    if (!this.roomSet.has(roomId)) {
      logger.warn(`roomId (${roomId}) does not exist in cache.`);
      return ['', ['', '']];
    }

    logger.trace(`searchRoomOccupantsByRoomId() | Finding index of roomId (${roomId})...`);
    let idx = 0;
    for (const room of this.roomSet.keys()) {
      if (room === roomId) {
        break;
      }
      idx++;
    }
    logger.debug(`searchRoomOccupantsByRoomId() | Found roomId index: ${idx}...`);

    const occupants = this.usersSet.get(idx);
    logger.debug(`searchRoomOccupantsByRoomId() | Found occupants: ${occupants}...`);

    return [roomId, occupants];
  };
}

export default new RoomOccupantsStore();
