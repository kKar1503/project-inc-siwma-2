import { ReasonType, UserContacts } from '@prisma/client';
import { z } from 'zod';

const getUsersQuery = z
  .object({
    lastIdPointer: z.string(),
    limit: z.string(),
  })
  .partial();

const userCreationRequestBody = z.object({
  token: z.string(),
  mobileNumber: z.string(),
  password: z.string(),
});

const userIdSchema = z.object({
  id: z.string().uuid(),
});

const updateUserDetailsSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    //   company is a number that represents the id of the company
    company: z.string(),
    profilePicture: z.string(),
    mobileNumber: z.string(),
    whatsappNumber: z.string(),
    telegramUsername: z.string(),
    contactMethod: z.nativeEnum(UserContacts),
    bio: z.string(),
    password: z.string(),
    userComments: z.string(),
  })
  .partial();

const createReportSchema = z.nativeEnum(ReasonType);

export type GetUsersQueryParameter = z.infer<typeof getUsersQuery>;
export type PostUserRequestBody = z.infer<typeof userCreationRequestBody>;
export type PutUserRequestBody = z.infer<typeof updateUserDetailsSchema>;
export type PostReportRequestBody = z.infer<typeof createReportSchema>;

export default {
  get: {
    query: getUsersQuery,
  },
  post: {
    body: userCreationRequestBody,
  },
  put: {
    body: updateUserDetailsSchema,
  },
  userId: userIdSchema,
  report: {
    post: {
      body: createReportSchema,
    },
  },
};
