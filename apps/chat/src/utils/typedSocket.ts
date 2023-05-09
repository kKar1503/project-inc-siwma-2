import { TypedSocketEmitter } from '@inc/types';
import { Server } from 'socket.io';

const typedSocket =
  (io: Server): TypedSocketEmitter =>
  (event, param) => {
    io.emit(event, param);
  };

export default typedSocket;
