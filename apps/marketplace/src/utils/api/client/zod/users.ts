import { z } from 'zod';
import { UserContacts } from '@inc/db';

const id = z.string();
const name = z.string();
const email = z.string();
const company = z.string();
const createdAt = z.date();
const enabled = z.boolean();
const profilePic = z.string().url();
const comments = z.string().optional(); // Only returned for admins
const mobileNumber = z.string();
const whatsappNumber = z.string();
const telegramUsername = z.string();
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
  whatsappNumber,
  telegramUsername,
  contactMethod,
  bio,
});

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

export default {
  create: createUser,
  getAll: getUsers,
  getById: getUser,
  update: updateUser,
  delete: deleteUser,
  toggle: toggleUser,
};
