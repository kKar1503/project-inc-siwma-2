import { Socket } from '@inc/types';

const handleError = (socket: Socket, error: Error) => {
  if (socket.connected) {
    socket.emit('error', { message: error.message }); // Emitting an error event to the socket
  }
};

/**
 * Socket IO error handler wrapper
 */
const errorHandler = <T extends (...args: any[]) => any>(socket: Socket, event: T) => {
  return function (this: undefined, ...params: Parameters<T>): void {
    try {
      const ret = event.apply(this, params);
      if (ret instanceof Promise) {
        // async handler
        ret.catch((error: Error) => handleError(socket, error));
      }
    } catch (error) {
      // sync handler
      handleError(socket, error as Error);
    }
  };
};

export default errorHandler;
