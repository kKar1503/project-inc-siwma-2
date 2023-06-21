import logger from '@/utils/logger';
import { StateListener } from '@/types/stateListener';

class SocketUserStore {
  private isInit = false;
  private socketSet: Set<string> | undefined;
  private userSet: Set<string> | undefined;
  private stateListenerIntervals: NodeJS.Timer[] | undefined;

  constructor() {}

  init() {
    this.isInit = true;
    this.socketSet = new Set<string>();
    this.userSet = new Set<string>();
    this.stateListenerIntervals = [];
  }

  private verifyInit() {
    if (!this.isInit) {
      throw new Error('SocketUserStore has not been initialized.');
    } else {
      return {
        socketSet: this.socketSet!,
        userSet: this.userSet!,
        stateListenerIntervals: this.stateListenerIntervals!,
      };
    }
  }

  reset() {
    const { socketSet, userSet } = this.verifyInit();

    socketSet.clear();
    userSet.clear();
  }

  attachStateListener = (
    stateListener: StateListener<{ sockets: string[]; users: string[] }>,
    stateListenerInterval?: number
  ) => {
    const { socketSet, userSet, stateListenerIntervals } = this.verifyInit();

    stateListenerIntervals.push(
      setInterval(() => {
        stateListener({
          sockets: [...socketSet],
          users: [...userSet],
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
   * This method adds the socket and user pair into the cache. Returns the
   * zero-based index of the insertion, -1 if socket or user already exist.
   */
  addSocketUser = (socketId: string, userId: string) => {
    const { socketSet, userSet } = this.verifyInit();

    logger.trace(`addSocketUser() | Checking if socketId (${socketId}) already exist in cache...`);
    if (socketSet.has(socketId)) {
      logger.warn(`socketId (${socketId}) already exist in cache.`);
      return -1;
    }

    logger.trace(`addSocketUser() | Checking if userId (${userId}) already exist in cache...`);
    if (userSet.has(userId)) {
      logger.warn(`userId (${userId}) already exist in cache.`);
      return -1;
    }

    logger.trace(`addSocketUser() | Adding socketId (${socketId}) to socketSet...`);
    socketSet.add(socketId);
    logger.trace(`addSocketUser() | Adding userId (${userId}) to userSet...`);
    userSet.add(userId);

    logger.debug(`addSocketUser() | Index Pos in socketSet: ${socketSet.size - 1}.`);
    logger.debug(`addSocketUser() | Index Pos in userSet: ${userSet.size - 1}.`);
    return socketSet.size - 1;
  };

  /**
   * This method removes the socket and user pair from the cache. Returns true
   * if the pair has been successfully removed, false if pair either does not exist in
   * cache, cannot be removed.
   */
  removeSocketUserBySocketId = (socketId: string) => {
    const { socketSet, userSet } = this.verifyInit();

    logger.trace(`removeSocketUserBySocketId() | Searching for socketId userId pair...`);
    const [, userId] = this.searchSocketUser('socketId', socketId);

    if (userId === '') return false;

    logger.trace(`removeSocketUserBySocketId() | Removing userId (${userId}) from userSet...`);
    const isUserRemoved = userSet.delete(userId);
    logger.trace(
      `removeSocketUserBySocketId() | Removing socketId (${socketId}) from socketSet...`
    );
    const isSocketRemoved = socketSet.delete(socketId);

    return isUserRemoved && isSocketRemoved;
  };

  /**
   * This method searches for the socket and user pair from the cache. Returns the
   * tuple values of the socketId and userId. If the search fails, the tuple values
   * returned will be empty strings.
   */
  searchSocketUser = (
    searchBy: 'socketId' | 'userId',
    search: string
  ): [SocketId: string, UserId: string] => {
    const { socketSet, userSet } = this.verifyInit();

    const searchForId = searchBy === 'socketId' ? 'userId' : 'socketId';
    const searchForSet = searchBy === 'socketId' ? userSet : socketSet;

    const searchSet = searchBy === 'socketId' ? socketSet : userSet;

    logger.debug(`searchSocketUser() | Search via ${searchBy}:${search}`);

    logger.trace(`searchSocketUser() | Checking if ${searchBy} (${search}) exist in cache...`);
    if (!searchSet.has(search)) {
      logger.warn(`${searchBy} (${search}) does not exist in cache.`);
      return ['', ''];
    }

    logger.trace(`searchSocketUser() | Finding index of ${searchBy} (${search})...`);
    let idx = 0;
    for (const searchSetKey of searchSet.keys()) {
      if (searchSetKey === search) {
        break;
      }
      idx++;
    }
    logger.debug(`searchSocketUser() | Found ${searchBy} index: ${idx}...`);

    const searchFor = [...searchForSet][idx];
    logger.debug(`searchSocketUser() | Found ${searchForId}: ${idx}...`);

    return searchBy === 'socketId' ? [search, searchFor] : [searchFor, search];
  };
}

export default new SocketUserStore();
