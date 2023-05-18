import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';


async function deleteMessageFromDatabase(room: string, message: string): Promise<void> {
    // Logic to delete message from database
}

const deleteMessageEvent: EventFile = (io) => ({
    eventName: EVENTS.CLIENT.DELETE_MESSAGE,
    type: 'on',
    callback: async ({ room, message }) => {
        console.log('deleteMessageEvent');
        try {
            await deleteMessageFromDatabase(room, message);
            io.emit(EVENTS.CLIENT.DELETE_MESSAGE, { data: { status: 'ok' } });
        } catch (error) {
            logger.error(`Error deleting message: ${error}`);
            io.emit(EVENTS.CLIENT.DELETE_MESSAGE, { data: { status: 'error', error: error.message } });
        }
    },
});

export default deleteMessageEvent;
