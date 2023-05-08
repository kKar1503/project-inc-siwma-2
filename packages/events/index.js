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
        CREATE_ROOM: 'createRoom',
        SEND_MESSAGE: 'sendMessage',
        PING: 'clientPing',
    },
    // Server Events
    SERVER: {
        ROOMS: 'rooms',
        JOINED_ROOM: 'joinedRoom',
        ROOM_MESSAGE: 'roomMessage',
        PING: 'serverPing',
    },
};
