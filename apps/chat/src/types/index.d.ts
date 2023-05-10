import { Socket as S } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

type Socket = S<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> & {
  authenticated?: boolean;
};

type SocketNextHandler = Function;
