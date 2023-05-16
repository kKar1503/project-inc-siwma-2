import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';
import { validateAccessToken } from '../middlewares/socketGuardMiddleware';
import { z } from 'zod';

const authenticateSchema = z.object({});

const event: EventFile = (io, socket) => ({
  eventName: EVENTS.CLIENT.AUTHENTICATE,
  type: 'on',
  callback: async (message) => {
    console.log({ message });

    // Check if the user supplied a valid access token
    await validateAccessToken(message.userId, message.token);
  },
});

export default event;
