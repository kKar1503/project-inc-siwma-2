import PrismaClient from '@inc/db';
import { validateToken } from '@inc/auth';
import { Socket, SocketNextHandler } from '../types';

/**
 * Checks if a access token is valid
 * @param userId The id of the user
 * @param token The token to check
 */
async function validateAccessToken(userId: string, token: string) {
  // Retrieve the token from the database
  const accessToken = await PrismaClient.accessTokens.findFirst({
    where: {
      token,
    },
  });

  // Check if the token is valid
  return validateToken({ userId, token: accessToken });
}

/**
 * Socket IO auth guard middleware
 */
const middleware = (socket: Socket, next: SocketNextHandler) => {
  // Check if the user is authenticated
  if (!socket.authenticated) {
    next();
  }

  // User is authenticated, check if the token is valid
  // validateAccessToken(socket.userId, socket.token)
};

export default middleware;
