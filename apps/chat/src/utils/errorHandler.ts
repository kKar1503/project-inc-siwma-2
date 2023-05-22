import { AuthError, BaseError } from '@inc/errors';
import { Socket } from '@inc/types';

/**
 * Handles errors
 * @param socket The socket instance
 * @param error The error to handle
 */
export const handleError = (socket: Socket, error: Error) => {
  // Initialise error response
  const response: any = { message: 'An unknown error occurred' };

  // Check if it was a custom error
  if (error instanceof BaseError) {
    // Check if the error is a auth error
    if (error instanceof AuthError) {
      // Disconnect the client
      socket.disconnect(true);
    }

    // Set the error message
    response.message = error.toJSON();
  }

  // Return the response
  if (socket.connected) {
    socket.emit('error', response);
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
