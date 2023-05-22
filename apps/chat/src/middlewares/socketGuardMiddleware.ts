import PrismaClient from '@inc/db';
import { validateToken } from '@inc/auth';
import { MiddlewareFile, Socket } from '@inc/types';
import { AuthError } from '@inc/errors';
import { decode } from 'next-auth/jwt';
import { User } from 'next-auth';

// Typescript is mentally ill and doesn't understand that the JWT interface is extended by the JWT interface in next-auth/jwt
// So we have to redeclare it here
interface JWT {
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
  user: User;
}

/**
 * Checks if a access token is valid
 * @param userId The id of the user
 * @param token The token to check
 */
export async function validateAccessToken(userId: string, token: string) {
  // Check if a user id and access token were provided
  if (!userId || !token) {
    throw new AuthError();
  }

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
 * Attempts to perform first-time authentication on the socket
 */
const authenticateUser = async (socket: Socket) => {
  // Check if the required headers are supplied
  if (!socket.request.headers.jwt_token) {
    throw new AuthError();
  }

  // Required info has been supplied, obtain the JWT token
  const jwtToken = socket.request.headers.jwt_token as string;

  // Decode the JWT token
  const token: JWT | null = (await decode({
    token: jwtToken,
    secret: process.env.NEXTAUTH_SECRET as string,
  })) as JWT | null;

  if (!token) {
    throw new AuthError();
  }

  // Validate the access token
  await validateAccessToken(token.user.id, token.accessToken);

  // Token validated, set the user id and token
  socket.userId = token.user.id;
  socket.token = token.accessToken;
  socket.authenticated = true;
};

/**
 * Socket IO auth guard middleware
 */
const middleware: MiddlewareFile = async (socket, next) => {
  // Authenticate the user
  await authenticateUser(socket).catch(next);

  // Exit middleware
  next();
};

export default middleware;
