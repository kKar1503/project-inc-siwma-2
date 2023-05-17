import { EventFile } from '@inc/types';
import logger from '../utils/logger';
import { EVENTS } from '@inc/events';

function deleteMessage(room: string, message: string): { data: { status: string } } {
    // wip

    return { data: { status: 'ok' } };
}

const deleteMessageEvent: EventFile = (io) => ({
    eventName: EVENTS.CLIENT.DELETE_MESSAGE,
    type: 'on',
    callback: (socket) => {
        console.log('adeeb')

        // socket.on(EVENTS.CLIENT.DELETE_MESSAGE, (request) => {
        //     const { room, message } = request;

        //     // Perform deletion and handle errors if necessary
        //     const result = deleteMessage(room, message);

        //     // Emit the response back to the client
        //     socket.emit(EVENTS.CLIENT.DELETE_MESSAGE, result);
        // });

        // socket.on(EVENTS.CONNECTION.DISCONNECT, () => {
        //     logger.info(`User disconnected`);
        // });

    },
});

export default deleteMessageEvent;
