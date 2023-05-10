import { z } from 'zod';
import { UserContacts } from '@inc/db';

const id = z.string();
const name = z.string();
const email = z.string();
const company = z.number();
const createdAt = z.date();
const enabled = z.boolean();
const profilePic = z.string().url();
const comments = z.string().optional(); // Only returned for admins
const mobileNumber = z.string();
const contactMethod = z.nativeEnum(UserContacts);
const bio = z.string();

const user = z.object({
  id,
  name,
  email,
  company,
  comments,
  createdAt,
  enabled,
  profilePic,
  mobileNumber,
  contactMethod,
  bio,
});

// Request Schemas
// export const updateUser = user.partial(); // .partial() means that all fields are optional
// export const createUser = user.omit({ id: true, createdAt: true, enabled: true });

// Response Schemas
export const enableUser = z.object({
  visible: enabled,
});
export const createUser = z.object({
  userId: id
});
export const getUser = user;
export const getUsers = user.array();
