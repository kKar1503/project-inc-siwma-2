import { Socket, Server } from 'socket.io';

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
};

type StartType = {
  sender: string;
  room: string;
};

type Read = {
  room: string;
  message: string;
};

// EventParams keys must match all the available events above in the const object.
type EventParams = {
  // Connections
  connect: Socket;
  disconnect: string;

  // Client Events
  createRoom: { roomName: string };
  sendMessage: RoomMessage;
  clientPing: string;
<<<<<<< HEAD
  deleteMessage: { room: string; message: number };
=======
  clientStartType: StartType;
  clientRead: Read;
>>>>>>> dev

  // Server Events
  rooms: Record<string, Room>;
  joinedRoom: Room;
  roomMessage: RoomMessage;
  serverPing: string;
  serverStartType: StartType;
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
