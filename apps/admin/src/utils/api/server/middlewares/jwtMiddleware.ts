import { APIRequestType } from '@/types/api-types';
import { NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextHandler } from 'next-connect';

/**
 * Decodes the JWT Token and appends it to the request body
 */
const jwtMiddleware = async (req: APIRequestType, res: NextApiResponse, next: NextHandler) => {
  // Decode the JWT token
  const token = await getToken({ req });

  // Append the token to the request object
  req.token = token;

  // Continue to handle the request
  next();
};

export default jwtMiddleware;
