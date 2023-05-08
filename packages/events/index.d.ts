export declare const EVENTS: {
    readonly CONNECTION: {
        readonly CONNECT: "connect";
        readonly DISCONNECT: "disconnect";
    };
    readonly CLIENT: {
        readonly CREATE_ROOM: "createRoom";
        readonly SEND_MESSAGE: "sendMessage";
        readonly PING: "clientPing";
    };
    readonly SERVER: {
        readonly ROOMS: "rooms";
        readonly JOINED_ROOM: "joinedRoom";
        readonly ROOM_MESSAGE: "roomMessage";
        readonly PING: "serverPing";
    };
};
