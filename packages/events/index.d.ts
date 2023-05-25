export declare const EVENTS: {
    readonly CONNECTION: {
        readonly CONNECT: "connect";
        readonly DISCONNECT: "disconnect";
    };
    readonly CLIENT: {
        readonly DELETE_MESSAGE: "deleteMessage";
        readonly CREATE_ROOM: "createRoom";
        readonly SEND_MESSAGE: "sendMessage";
        readonly PING: "clientPing";
        readonly START_TYPE: "clientStartType";
        readonly STOP_TYPE: "clientStopType";
        readonly READ: "clientRead";
    };
    readonly SERVER: {
        readonly ROOMS: "rooms";
        readonly JOINED_ROOM: "joinedRoom";
        readonly ROOM_MESSAGE: "roomMessage";
        readonly PING: "serverPing";
        readonly START_TYPE: "serverStartType";
        readonly STOP_TYPE: "serverStopType";
        readonly READ: "serverRead";
    };
};
