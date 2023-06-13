import type { NextApiRequest } from 'next';
import type { JWT } from 'next-auth/jwt';

// Define the type of the API request object
export type APIRequestType = NextApiRequest & {
  token?: JWT | null;
};

// Define the type of the API Guard options object
export type APIGuardOptions = {
  allowNonAuthenticated?: boolean;
  allowAdminsOnly?: boolean;
};

// Define the type of the API Handler options object
export type APIHandlerOptions = APIGuardOptions;
