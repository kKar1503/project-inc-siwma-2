import { Event } from '@inc/types';

export const EVENTS = {
  // Connections
  CONNECTION: {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    IAM: 'iam',
  },

  // Client Events
  CLIENT: {
    ROOM: {
      JOIN: 'clientJoinRoom',
      PART: 'clientPartRoom',
      CREATE: 'clientCreateRoom',
      DELETE: 'clientDeleteRoom',
      GET: 'clientGetRooms',
    },
    MESSAGE: {
      SEND: 'clientSendMessage',
      DELETE: 'clientDeleteMessage',
      READ: 'clientReadMessage',
      SYNC: 'clientSyncMessage',
      GET: 'clientGetMessages',
    },
    OFFER: {
      MAKE: 'clientMakeOffer',
      ACCEPT: 'clientAcceptOffer',
      REJECT: 'clientRejectOffer',
      CANCEL: 'clientCancelOffer',
    },
    TYPING: {
      START: 'clientStartType',
      STOP: 'clientStopType',
    },
  },

  // Server Events
  SERVER: {
    ROOM: {
      CREATED: 'serverCreatedRoom',
      DELETED: 'serverDeletedRoom',
      SYNC: 'serverSyncRooms',
    },
    MESSAGE: {
      ROOM: 'serverRoomMessage',
      DELETED: 'serverDeletedMessage',
      READ: 'serverReadMessage',
      SYNC: 'serverSyncMessage',
      SYNC2: 'serverSyncMessage2',
    },
    OFFER: {
      MAKE: 'serverMakeOffer',
      ACCEPT: 'serverAcceptOffer',
      REJECT: 'serverRejectOffer',
      CANCEL: 'serverCancelOffer',
    },
    TYPING: {
      START: 'serverStartType',
      STOP: 'serverStopType',
    },
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
