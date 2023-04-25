import prisma from '@/utils/prisma';
import bcrypt from 'bcryptjs';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import authHandler from '@/utils/api/server/authHandler';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, token }) => {
      // Initialise result
      const result = session;

      if (session?.user && typeof token.uid === 'string') {
        result.user.id = token.uid;
      }

      return result;
    },
    jwt: async ({ user, token, account }) => {
      // https://next-auth.js.org/v3/tutorials/refresh-token-rotation
      // Handle initial sign in (account and user are only returned on initial sign in)
      if (account && user) {
        // Generate a new refresh and access token
        const generatedTokens = await authHandler.requestTokens(user.id);

        // Construct result object
        const result = {
          ...token,
          ...generatedTokens,
          user,
        };

        return result;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      const newTokens = await authHandler.refreshAccessToken(
        token.user.id,
        token.accessToken,
        token.refreshToken
      );

      // Construct result object
      const result: JWT = {
        ...token,
        ...newTokens,
      };

      return result;
    },
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Username' },
        password: { label: 'Password', type: 'password', placeholder: 'Username' },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        // Check if any credentials were provided
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        // -- Verify that the user exists in the database --//
        // Retrieve the user from the database
        const user = await prisma.users.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Check if a user with the email provided exists
        if (!user) {
          // It does not
          return null;
        }

        // Check if the password provided matches that of the user retrieved
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        // Return null if password is wrong
        if (!isPasswordCorrect) {
          return null;
        }

        // Format the result to be returned
        const result = {
          id: user.id,
          email: user.email,
          name: user.name,
          permissions: user.permissions,
        };

        // Any object returned will be saved in the `user` property of the JWT
        return result;
      },
    }),
  ],
};

export default NextAuth(authOptions);
