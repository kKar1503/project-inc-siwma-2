import type { Socket, Server, DisconnectReason } from 'socket.io';

type UserId = string;
type RoomId = string;
type MessageId = number;
type ListingId = number;

export type ClientSendMessage = {
  roomId: RoomId;
  message: string;
  time: Date;
};

export type ServerRoomMessage = {
  id: MessageId;
  roomId: RoomId;
  message: string;
  time: Date;
};

export type Room = {
  id: RoomId;
  user: UserId;
};

export type ClientCreateRoom = {
  sellerId: UserId;
  listingId: ListingId;
};

// EventParams keys must match all the available events above in the const object.
type EventParams = {
  // ** Connections
  connect: Socket;
  disconnect: DisconnectReason;
  iam: UserId;

  // ** Client Events
  // Client Room Events
  clientJoinRoom: RoomId;
  clientPartRoom: RoomId;
  clientCreateRoom: ClientCreateRoom;
  clientDeleteRoom: RoomId;
  // Client Message Events
  clientSendMessage: ClientSendMessage;
  clientDeleteMessage: MessageId;
  clientReadMessage: RoomId;
  // Client Typing Events
  clientStartType: RoomId;
  clientStopType: RoomId;

  // ** Server Events
  // Server Room Events
  serverCreatedRoom: Room;
  serverDeletedRoom: RoomId;
  // Server Message Events
  serverRoomMessage: ServerRoomMessage;
  serverDeletedMessage: MessageId;
  serverReadMessage: MessageId[];
  // Server Typing Events
  serverStartType: UserId;
  serverStopType: UserId;
};

type Event = keyof EventParams;

export type Acknowlegement =
  | {
      success: true;
      data?: any;
    }
  | {
      success: false;
      err?: {
        message: string;
      };
    };

type EventFile = (
  io: Server,
  socket: Socket
) => {
  [K in keyof EventParams]: {
    eventName: K;
    callback: (param: EventParams[K], ack: (acknowledgement: Acknowlegement) => void) => void;
    type: 'on' | 'once';
  };
}[keyof EventParams];

type TypedSocketEmitter = <E extends Event, P extends EventParams[E]>(event: E, param: P) => void;

export type { Event, EventFile, TypedSocketEmitter };
