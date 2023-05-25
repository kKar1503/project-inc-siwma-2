"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENTS = void 0;
exports.EVENTS = {
    // Connections
    CONNECTION: {
        CONNECT: 'connect',
        DISCONNECT: 'disconnect',
    },
    // Client Events
    CLIENT: {
        DELETE_MESSAGE: 'deleteMessage',
        CREATE_ROOM: 'createRoom',
        SEND_MESSAGE: 'sendMessage',
        PING: 'clientPing',
        START_TYPE: 'clientStartType',
        STOP_TYPE: 'clientStopType',
        READ: 'clientRead',
    },
    // Server Events
    SERVER: {
        ROOMS: 'rooms',
        JOINED_ROOM: 'joinedRoom',
        ROOM_MESSAGE: 'roomMessage',
        PING: 'serverPing',
        START_TYPE: 'serverStartType',
        STOP_TYPE: 'serverStopType',
        READ: 'serverRead',
    },
};
