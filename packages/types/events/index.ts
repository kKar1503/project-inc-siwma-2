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
  time: Date;
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
  read: {
    room: string,
    message: string,
  }

  // Server Events
  rooms: Record<string, Room>;
  joinedRoom: Room;
  roomMessage: RoomMessage;
  serverPing: string;
};

type Event = keyof EventParams;

type EventFile = (io: Server) => {
  [K in keyof EventParams]: {
    eventName: K;
    callback: (param: EventParams[K]) => void;
    type: 'on' | 'once';
  };
}[keyof EventParams];

type TypedSocketEmitter = <E extends Event, P extends EventParams[E]>(
  event: E,
  param: P
) => void;

export type { Event, EventFile, TypedSocketEmitter };
