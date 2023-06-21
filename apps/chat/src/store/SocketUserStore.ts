import logger from '../utils/logger';

class SocketUserStore {
  private socketSet: Set<string>;
  private userSet: Set<string>;

  constructor() {
    this.socketSet = new Set();
    this.userSet = new Set();
  }

  /**
   * This method adds the socket and user pair into the cache. Returns the
   * zero-based index of the insertion, -1 if socket or user already exist.
   */
  addSocketUser = (socketId: string, userId: string) => {
    logger.trace(`addSocketUser() | Checking if socketId (${socketId}) already exist in cache...`);
    if (this.socketSet.has(socketId)) {
      logger.warn(`socketId (${socketId}) already exist in cache.`);
      return -1;
    }

    logger.trace(`addSocketUser() | Checking if userId (${userId}) already exist in cache...`);
    if (this.userSet.has(userId)) {
      logger.warn(`userId (${userId}) already exist in cache.`);
      return -1;
    }

    logger.trace(`addSocketUser() | Adding socketId (${socketId}) to socketSet...`);
    this.socketSet.add(socketId);
    logger.trace(`addSocketUser() | Adding userId (${userId}) to userSet...`);
    this.userSet.add(userId);

    logger.debug(`addSocketUser() | Index Pos in socketSet: ${this.socketSet.size - 1}.`);
    logger.debug(`addSocketUser() | Index Pos in userSet: ${this.userSet.size - 1}.`);
    return this.socketSet.size - 1;
  };

  /**
   * This method removes the socket and user pair from the cache. Returns true
   * if the pair has been successfully removed, false if pair either does not exist in
   * cache, cannot be removed.
   */
  removeSocketUserBySocketId = (socketId: string) => {
    logger.trace(`removeSocketUserBySocketId() | Searching for socketId userId pair...`);
    const [, userId] = this.searchSocketUser('socketId', socketId);

    if (userId === '') return false;

    logger.trace(`removeSocketUserBySocketId() | Removing userId (${userId}) from userSet...`);
    const isUserRemoved = this.userSet.delete(userId);
    logger.trace(
      `removeSocketUserBySocketId() | Removing socketId (${socketId}) from socketSet...`
    );
    const isSocketRemoved = this.socketSet.delete(socketId);

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
    const searchForId = searchBy === 'socketId' ? 'userId' : 'socketId';
    const searchForSet = searchBy === 'socketId' ? this.userSet : this.socketSet;

    const searchSet = searchBy === 'socketId' ? this.socketSet : this.userSet;

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
