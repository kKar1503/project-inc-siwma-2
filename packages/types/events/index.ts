import type { Socket, Server, DisconnectReason } from 'socket.io';
import type { Socket as ClientSocket } from 'socket.io-client';

type UserId = string;
type RoomId = string;
type MessageId = number;
type ListingId = number;

type LastMessage = (
  | {
      contentType: 'text' | 'file' | 'image';
    }
  | {
      contentType: 'offer';
      multiple: boolean;
      offerAccepted: boolean;
      amount: number;
    }
) & {
  content: string;
};

export type ClientSendMessage = {
  roomId: RoomId;
  message: string;
  time: string;
};

export type Room = {
  id: RoomId;
  username: string;
  category: 'BUY' | 'SELL';
  latestMessage?: LastMessage;
  itemName: string;
  inProgress: boolean;
  time?: string;
  userImage: string;
  unreadMessages: number;
};

export type DataSync<T> =
  | {
      status: 'in_progress';
      progress: number;
      data: T;
    }
  | {
      status: 'success';
    }
  | {
      status: 'error';
      err?: string;
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
  createdAt: string;
  contentType: 'text' | 'file' | 'image' | 'offer';
  offer: number | null;
  content: string;
};

export type MessageSync = DataSync<Messages>;
export type RoomSync = DataSync<Room>;

// ** Types Declarations **
export type LoadingState = 'idle' | 'iam' | 'sync';

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
  clientGetRooms: UserId; // Has Ack
  // Client Message Events
  clientSendMessage: ClientSendMessage; // Has Ack
  clientDeleteMessage: MessageId; // Has Ack
  clientReadMessage: RoomId; // Has Ack
  clientSyncMessage: MessageId; // Has Ack
  clientGetMessages: RoomId; // Has Ack
  // Client Typing Events
  clientStartType: RoomId;
  clientStopType: RoomId;

  // ** Server Events
  // Server Room Events
  serverCreatedRoom: Room;
  serverDeletedRoom: RoomId;
  serverSyncRooms: RoomSync;
  // Server Message Events
  serverRoomMessage: Messages;
  serverDeletedMessage: MessageId;
  serverReadMessage: MessageId[];
  serverSyncMessage: MessageSync;
  serverSyncMessage2: MessageSync;
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
  hookParams: T,
  setLoading: (loading: LoadingState) => void
) => {
  [K in keyof EventParams]: {
    eventName: K;
    callback: (param: EventParams[K]) => void;
    type: 'on' | 'once';
  };
}[keyof EventParams];

type TypedSocketEmitter = <E extends Event, P extends EventParams[E]>(event: E, param: P) => void;

export type { Event, ClientEventFile, EventFile, TypedSocketEmitter };
