import { Socket, Server } from 'socket.io';

type DatabaseEvent = {
  success: boolean;
}

type Room = {
  id: string;
  name: string;
  activeUsers: number;
};

type RoomMessage = {
  roomId: string;
  message: string;
  username: string;
  contentType: string;
  time: Date;
} & DatabaseEvent;

type StartStopType = {
  sender: string;
  roomId: string;
};

type Read = {
  room: string;
  messageId: number;
} & DatabaseEvent;

type DeleteMessage = {
  room: string;
  messageId: number;
} & DatabaseEvent;

// EventParams keys must match all the available events above in the const object.
type EventParams = {
  // Connections
  connect: Socket;
  disconnect: string;

  // Client Events
  createRoom: { roomName: string };
  sendMessage: RoomMessage;
  clientPing: string;
  deleteMessage: DeleteMessage;
  clientStartType: StartStopType;
  clientStopType: StartStopType;
  clientRead: Read;

  // Server Events
  rooms: Record<string, Room>;
  joinedRoom: Room;
  roomMessage: RoomMessage;
  serverPing: string;
  serverStartType: StartStopType;
  serverStopType: StartStopType;
  serverRead: Read;
};

type Event = keyof EventParams;

type EventFile = (io: Server) => {
  [K in keyof EventParams]: {
    eventName: K;
    callback: (param: EventParams[K]) => void;
    type: 'on' | 'once';
  };
}[keyof EventParams];

type TypedSocketEmitter = <E extends Event, P extends EventParams[E]>(event: E, param: P) => void;

export type { Event, EventFile, TypedSocketEmitter };
