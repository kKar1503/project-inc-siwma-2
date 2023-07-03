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
    mobileNumber: z.string(),
    whatsappNumber: z.string(),
    telegramUsername: z.string(),
    contactMethod: z.nativeEnum(UserContacts),
    bio: z.string(),
    password: z.string(),
    oldPassword: z.string(),
    userComments: z.string(),
  })
  .partial();

const createReportSchema = z.object({
  // validates against ReasonType enum from zod
  reason: z.nativeEnum(ReasonType),
});

const resetPasswordSchema = z.object({
  newPassword: z.string(),
  token: z.string(),
});

const forgetPasswordSchema = z.object({
  email: z.string(),
});

export type GetUsersQueryParameter = z.infer<typeof getUsersQuery>;
export type PostUserRequestBody = z.infer<typeof userCreationRequestBody>;
export type PutUserRequestBody = z.infer<typeof updateUserDetailsSchema>;
export type PostReportRequestBody = z.infer<typeof createReportSchema>;
export type ResetPasswordRequestBody = z.infer<typeof resetPasswordSchema>;
export type ForgetPasswordQueryParameter = z.infer<typeof forgetPasswordSchema>;

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
  resetPassword: {
    post: {
      body: resetPasswordSchema,
    },
  },
  forgetPassword: {
    post: {
      query: forgetPasswordSchema,
    },
  },
};
