import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';

const deleteMessageEvent: EventFile = (io) => ({
    eventName: EVENTS.CLIENT.DELETE_MESSAGE,
    type: 'on',
    callback: async ({ room, message }) => {
        logger.info(`${message}  ${room}`);
        io.to(room).emit(EVENTS.CLIENT.DELETE_MESSAGE, message);
    },
});

export default deleteMessageEvent;
