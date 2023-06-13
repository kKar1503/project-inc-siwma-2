import { z } from 'zod';

const tokenSchema = z.object({
  token: z.string(),
});

const bulkInviteSchema = z.array(
  z.object({
    mobileNumber: z.string().optional(),
    name: z.string(),
    email: z.string(),
    company: z.string(),
  })
);

const emailSchema = z.object({
  email: z.string(),
});

const inviteCreationRequestBody = z.object({
  email: z.string(),
  name: z.string(),
  company: z.string(),
});

const getInvitesQuery = z.object({
  lastIdPointer: z.string().optional(),
  limit: z.string().optional(),
});

export type GetInvitesQueryParameter = z.infer<typeof getInvitesQuery>;
export type PostInviteRequestBody = z.infer<typeof inviteCreationRequestBody>;
export type PostBulkInviteRequestBody = z.infer<typeof bulkInviteSchema>;
export type DeleteInviteQueryParameter = z.infer<typeof emailSchema>;
export type GetTokenQueryParameter = z.infer<typeof tokenSchema>;

export default {
  token: {
    get: {
      query: tokenSchema,
    },
  },
  bulk: {
    post: {
      body: bulkInviteSchema,
    },
  },
  email: {
    delete: {
      query: emailSchema,
    },
    resend: {
      body: emailSchema,
    },
  },
  post: {
    body: inviteCreationRequestBody,
  },
  get: {
    query: getInvitesQuery,
  },
};
