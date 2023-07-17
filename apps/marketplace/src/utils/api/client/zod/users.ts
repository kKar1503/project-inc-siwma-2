import { z } from 'zod';
import { UserContacts } from '@inc/db';
import listingSchemas from './listings';

const id = z.string();
const name = z.string();
const email = z.string();
const company = z.string();
const createdAt = z.string().datetime();
const enabled = z.boolean();
const profilePic = z.string().nullable();
const comments = z.string().nullable().optional(); // Only returned for admins
const mobileNumber = z.string();
const whatsappNumber = z.string().nullable();
const telegramUsername = z.string().nullable();
const contactMethod = z.nativeEnum(UserContacts);
const bio = z.string().nullable();
const bookmarks = z
  .object({
    users: z.array(z.string()),
    companies: z.array(z.string()),
    listings: z.array(z.string()),
  })
  .optional();
const bookmarkUser = z.object({
  bookmarked: z.boolean(),
});

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
  whatsappNumber,
  telegramUsername,
  contactMethod,
  bio,
  bookmarks,
});

export type UserResponseBody = z.infer<typeof user>;

// Request Schemas (Not Implemented)
// export const updateUser = user.partial(); // .partial() means that all fields are optional
// export const createUser = user.omit({ id: true, createdAt: true, enabled: true });

// Response Schemas
const toggleUser = z.object({
  visible: enabled,
});
const createUser = z.object({
  userId: id,
});
const getUser = user;
const updateUser = user;
const deleteUser = z.object({});
const getUsers = user.array();

export type User = z.infer<typeof user>;

export default {
  create: createUser,
  getAll: getUsers,
  getById: getUser,
  update: updateUser,
  delete: deleteUser,
  toggle: toggleUser,
  bookmark: bookmarkUser,
  getListings: listingSchemas.getAll,
};
