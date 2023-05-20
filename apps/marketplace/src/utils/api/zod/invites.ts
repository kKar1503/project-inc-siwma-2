import { z } from 'zod';

const id = z.string().transform((val) => Number(val));
const name = z.string();
const email = z.string();
const companyId = z.string();

const invite = z.object({
  id,
  name,
  email,
  companyId,
});

// Response Schemas
export const createInvite = z.object({
  inviteId: id,
});

export const deleteInvite = z.object({});
export const getInvite = invite;
export const getInvites = invite.array();
