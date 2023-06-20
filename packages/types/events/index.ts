import type { Socket, Server, DisconnectReason } from 'socket.io';

type UserId = string;
type RoomId = string;
type MessageId = string;

type ClientSendMessage = {
  message: string;
  time: Date;
};

type ServerRoomMessage = {
  id: MessageId;
  message: string;
  time: Date;
};

type Room = {
  id: RoomId;
  user: UserId;
};

// EventParams keys must match all the available events above in the const object.
type EventParams = {
  // ** Connections
  connect: Socket;
  disconnect: DisconnectReason;

  // ** Client Events
  // Client Room Events
  clientJoinRoom: RoomId;
  clientCreateRoom: UserId;
  clientDeleteRoom: RoomId;
  // Client Message Events
  clientSendMessage: ClientSendMessage;
  clientDeleteMessage: MessageId;
  // Client Typing Events
  clientStartType: never;
  clientStopType: never;

  // ** Server Events
  // Server Room Events
  serverCreatedRoom: Room;
  serverDeletedRoom: RoomId;
  // Server Message Events
  serverRoomMessage: ServerRoomMessage;
  serverDeletedMessage: MessageId;
  serverReadMessage: MessageId;
  // Server Typing Events
  serverStartType: RoomId;
  serverStopType: RoomId;
};

type Event = keyof EventParams;

type EventFile = (
  io: Server,
  socket?: Socket
) => {
  [K in keyof EventParams]: {
    eventName: K;
    callback: (param: EventParams[K], callback?: (...args: any[]) => void) => void;
    type: 'on' | 'once';
  };
}[keyof EventParams];

type TypedSocketEmitter = <E extends Event, P extends EventParams[E]>(event: E, param: P) => void;

export type { Event, EventFile, TypedSocketEmitter };
