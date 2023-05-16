import { AuthError, ForbiddenError } from '@inc/errors';
import { NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import PrismaClient from '@inc/db';
import { APIGuardOptions, APIRequestType } from '@/types/api-types';
import { validateToken } from '@inc/auth';

/**
 * Checks if a access token is valid
 * @param userId The id of the user
 * @param token The token to check
 */
async function validateAccessToken(userId: string, token: string) {
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

  // Check if the token is valid
  return validateToken({ userId, token: accessToken });
}

/**
 * Protects API routes
 * @param options Options for the middleware
 */
export const apiGuardMiddleware =
  (options?: APIGuardOptions) =>
  // Return the middleware function
  async (req: APIRequestType, res: NextApiResponse, next: NextHandler) => {
    // Perform an auth check if required (defaults to true)
    if (!options?.allowNonAuthenticated) {
      // Check if the user is authenticated
      if (!req.token || !req.token.accessToken || !req.token.refreshToken) {
        // User is not authenticated
        throw new AuthError();
      }

      // User is authenticated, check if the access token is valid
      await validateAccessToken(req.token.user.id, req.token.accessToken);
    }

    // Perform an admin check if required (defaults to false)
    if (options?.allowAdminsOnly) {
      // Check if the user is an admin
      if (!req.token?.user.permissions) {
        // User is not an admin
        // Throw an error
        throw new ForbiddenError(req.token?.user.name);
      }
    }

    // Continue to handle the request
    next();
  };

export default apiGuardMiddleware;
