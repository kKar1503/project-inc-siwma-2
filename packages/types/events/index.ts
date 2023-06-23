import type { Socket, Server, DisconnectReason } from 'socket.io';
import type { Socket as ClientSocket } from 'socket.io-client';

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

export type Messages = {
  id: number;
  author: string;
  room: string;
  read: boolean;
  createdAt: Date;
  contentType: 'text' | 'file' | 'image' | 'offer';
  offer: number | null;
  content: string;
};

export type MessageSync =
  | {
      status: 'in_progress';
      message: Messages;
    }
  | {
      status: 'success';
    }
  | {
      status: 'error';
      err?: string;
    };

// EventParams keys must match all the available events above in the const object.
type EventParams = {
  // ** Connections
  connect: Socket;
  disconnect: DisconnectReason;
  iam: UserId;

  // ** Client Events
  // Client Room Events
  clientJoinRoom: RoomId; // Has Ack
  clientPartRoom: RoomId; // Has Ack
  clientCreateRoom: ClientCreateRoom; // Has Ack
  clientDeleteRoom: RoomId; // Has Ack
  // Client Message Events
  clientSendMessage: ClientSendMessage; // Has Ack
  clientDeleteMessage: MessageId; // Has Ack
  clientReadMessage: RoomId; // Has Ack
  clientSyncMessage: MessageId; // Has Ack
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
  serverSyncMessage: MessageSync;
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

type ClientEventFile<T> = (
  socket: ClientSocket,
  hookParams: T
) => {
  [K in keyof EventParams]: {
    eventName: K;
    callback: (param: EventParams[K]) => void;
    type: 'on' | 'once';
  };
}[keyof EventParams];

type TypedSocketEmitter = <E extends Event, P extends EventParams[E]>(event: E, param: P) => void;

export type { Event, ClientEventFile, EventFile, TypedSocketEmitter };
