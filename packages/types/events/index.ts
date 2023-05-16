import { Socket as S, Server } from 'socket.io';

// Socket.IO type extensions
type Socket = S & {
  authenticated?: boolean;
  userId?: string;
  token?: string;
};

type SocketNextHandler = (err?: Error | undefined) => void;

type Room = {
  id: string;
  name: string;
  activeUsers: number;
};

type RoomMessage = {
  roomId: string;
  message: string;
  username: string;
  time: Date;
};

type Authenticate = {
  userId: string;
  token: string;
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

  // Server Events
  rooms: Record<string, Room>;
  joinedRoom: Room;
  roomMessage: RoomMessage;
  authenticate: Authenticate;
  serverPing: string;
};

type Event = keyof EventParams;

type EventFile = (
  io: Server,
  socket: Socket
) => {
  [K in keyof EventParams]: {
    eventName: K;
    callback: (param: EventParams[K]) => void;
    type: 'on' | 'once';
  };
}[keyof EventParams];

type TypedSocketEmitter = <E extends Event, P extends EventParams[E]>(event: E, param: P) => void;

type MiddlewareFile = (socket: Socket, next: SocketNextHandler) => Promise<void>;

export type { Event, EventFile, TypedSocketEmitter, MiddlewareFile };
