import { Event } from '@inc/types';

export const EVENTS = {
  // Connections
  CONNECTION: {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
  },

  // Client Events
  CLIENT: {
    CREATE_ROOM: 'createRoom',
    SEND_MESSAGE: 'sendMessage',
    AUTHENTICATE: 'authenticate',
    PING: 'clientPing',
    START_TYPE: 'clientStartType',
    READ: 'clientRead',
  },

  // Server Events
  SERVER: {
    ROOMS: 'rooms',
    JOINED_ROOM: 'joinedRoom',
    ROOM_MESSAGE: 'roomMessage',
    PING: 'serverPing',
    START_TYPE: 'serverStartType',
    READ: 'serverRead',
  },
} as const;

type DeepValueOf<T extends Record<string, unknown>, Key = keyof T> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ? DeepValueOf<T[Key]>
    : T[keyof T]
  : never;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DeclaredEventsObj = Extract<DeepValueOf<typeof EVENTS>, string>;
type Check = Expect<Equal<Event, DeclaredEventsObj>>;
// This serves as a type check to ensure your events matches the declared types

type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;
