import { logger } from '@/utils/logger';
import OccupantsSet, { Occupants } from './OccupantsSet';
import { StateListener } from '@/types/stateListener';

class RoomOccupantsStore {
  private isInit = false;
  private roomSet: Set<string> | undefined;
  private usersSet: OccupantsSet | undefined;
  private stateListenerIntervals: NodeJS.Timer[] | undefined;

  constructor() {}

  init() {
    this.isInit = true;
    this.roomSet = new Set<string>();
    this.usersSet = new OccupantsSet();
    this.stateListenerIntervals = [];
  }

  private verifyInit() {
    if (!this.isInit) {
      throw new Error('RoomOccupantsStore has not been initialized.');
    } else {
      return {
        roomSet: this.roomSet!,
        usersSet: this.usersSet!,
        stateListenerIntervals: this.stateListenerIntervals!,
      };
    }
  }

  reset() {
    const { roomSet, usersSet } = this.verifyInit();

    roomSet.clear();
    usersSet.clear();
  }

  attachStateListener = (
    stateListener: StateListener<{ rooms: string[]; occupants: Occupants[] }>,
    stateListenerInterval?: number
  ) => {
    const { roomSet, usersSet, stateListenerIntervals } = this.verifyInit();

    stateListenerIntervals.push(
      setInterval(() => {
        stateListener({
          rooms: [...roomSet],
          occupants: [...usersSet],
        });
      }, stateListenerInterval || 10000)
    );
  };

  removeStateListener = () => {
    const { stateListenerIntervals } = this.verifyInit();

    stateListenerIntervals.forEach((interval) => {
      clearInterval(interval);
    });
  };

  /**
   * This method adds the room and occupants pair into the cache. Returns the
   * zero-based index of the insertion, -1 if room or occupants already exist.
   */
  addRoomOccupants = (roomId: string, userIds: Occupants) => {
    const { roomSet, usersSet } = this.verifyInit();

    logger.trace(`addRoomOccupants() | Checking if socketId (${roomId}) already exist in cache...`);
    if (roomSet.has(roomId)) {
      logger.warn(`socketId (${roomId}) already exist in cache.`);
      return -1;
    }

    logger.trace(`addRoomOccupants() | Adding userId (${userIds}) to userSet...`);
    const areUsersAdded = usersSet.add(userIds);

    if (areUsersAdded) {
      logger.trace(`addRoomOccupants() | userId (${userIds}) not added...`);
      logger.warn(`userId (${userIds}) already exist in cache.`);
      return -1;
    }

    logger.trace(`addRoomOccupants() | Adding socketId (${roomId}) to socketSet...`);
    roomSet.add(roomId);

    logger.debug(`addRoomOccupants() | Index inserted in socketSet: ${roomSet.size - 1}.`);
    logger.debug(`addRoomOccupants() | Index inserted in userSet: ${usersSet.size - 1}.`);
    return roomSet.size - 1;
  };

  /**
   * This method removes the room and occupants pair from the cache. Returns true
   * if the pair has been successfully removed, false if pair either does not exist in
   * cache, cannot be removed.
   */
  removeRoomOccupantsByRoomId = (roomId: string) => {
    const { roomSet, usersSet } = this.verifyInit();

    logger.trace(`removeRoomOccupantsByRoomId() | Searching for roomId occupants pair...`);
    const [, occupants] = this.searchRoomOccupantsByRoomId(roomId);

    if (occupants[0] === '') return false;

    logger.trace(
      `removeRoomOccupantsByRoomId() | Removing occupants (${occupants}) from usersSet...`
    );
    const areUsersRemoved = usersSet.delete(occupants);
    logger.trace(`removeRoomOccupantsByRoomId() | Removing roomId (${roomId}) from roomSet...`);
    const isRoomRemoved = roomSet.delete(roomId);

    return areUsersRemoved && isRoomRemoved;
  };

  /**
   * This method searches for the room and occupants pair from the cache. Returns the
   * tuple values of the roomId and occupants' Ids. If the search fails, the tuple values
   * returned will be empty strings.
   */
  searchRoomOccupantsByRoomId = (roomId: string): [RoomId: string, Occupants: Occupants] => {
    const { roomSet, usersSet } = this.verifyInit();

    logger.trace(
      `searchRoomOccupantsByRoomId() | Checking if roomId (${roomId}) exist in cache...`
    );
    if (!roomSet.has(roomId)) {
      logger.warn(`roomId (${roomId}) does not exist in cache.`);
      return ['', ['', '']];
    }

    logger.trace(`searchRoomOccupantsByRoomId() | Finding index of roomId (${roomId})...`);
    let idx = 0;
    for (const room of roomSet.keys()) {
      if (room === roomId) {
        break;
      }
      idx++;
    }
    logger.debug(`searchRoomOccupantsByRoomId() | Found roomId index: ${idx}...`);

    const occupants = usersSet.get(idx);
    logger.debug(`searchRoomOccupantsByRoomId() | Found occupants: ${occupants}...`);

    return [roomId, occupants];
  };
}

export default new RoomOccupantsStore();
