import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';

const event: EventFile = (io) => ({
  eventName: EVENTS.CLIENT.PING,
  type: 'on',
  callback: (message) => {
    logger.info(`Message from client: ${message}`);
  },
});

export default event;
