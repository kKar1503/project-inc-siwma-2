import PrismaClient from '@inc/db';
import { validateToken } from '@inc/auth';
import { MiddlewareFile } from '@inc/types';
import { ForbiddenError } from '@inc/errors';

/**
 * Checks if a access token is valid
 * @param userId The id of the user
 * @param token The token to check
 */
export async function validateAccessToken(userId: string, token: string) {
  // Check if a user id and access token were provided
  if (!userId || !token) {
    throw new ForbiddenError(userId);
  }

  // Retrieve the token from the database
  const accessToken = await PrismaClient.accessTokens.findFirst({
    where: {
      token,
    },
  });

  console.log({ token, accessToken });

  // Check if the token is valid
  return validateToken({ userId, token: accessToken });
}

/**
 * Socket IO auth guard middleware
 */
const middleware: MiddlewareFile = async (socket, next) => {
  // Check if the user is authenticated
  if (!socket.authenticated || !socket.userId || !socket.token) {
    console.log('guard skipped');
    next();
    return;
  }

  console.log('guarding');

  // User is authenticated, check if the token is valid
  await validateAccessToken(socket.userId, socket.token);

  console.log('guard passed');

  next();
};

export default middleware;
