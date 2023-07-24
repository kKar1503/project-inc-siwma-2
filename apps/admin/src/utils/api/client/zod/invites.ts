import { z } from 'zod';

const id = z.string();
const name = z.string();
const email = z.string();
const company = z.object({
  id: z.string(),
  name: z.string(),
});

const invite = z.object({
  id,
  name,
  email,
  company,
});

// Response Schemas
const createInvite = z.object({
  inviteId: id,
});

const deleteInvite = z.object({});
const getInvite = invite;
const getInvites = invite.array();

export type Invite = z.infer<typeof invite>;

export default {
  create: createInvite,
  delete: deleteInvite,
  getById: getInvite,
  getAll: getInvites,
};
