import { ListingType } from '@prisma/client';
import { z } from 'zod';

const createChatRoom = z.object({
  room: z.string().uuid(),
});

const user = z.object({
  id: z.string().uuid(),
  name: z.string(),
  profilePicture: z.string().url(),
  enabled: z.boolean(),
});

const listing = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  unitPrice: z.boolean(),
  type: z.nativeEnum(ListingType),
  open: z.boolean(),
  purchased: z.boolean(),
});

const getChatRoom = z.object({
  id: z.string().uuid(),
  seller: user,
  buyer: user,
  listing,
  createdAt: z.string().datetime(),
});

const getChatMessage = z.object({
  id: z.string(),
  contentType: z.string(),
  read: z.boolean(),
  content: z.string().optional(),
  offer: z.number().nullable().optional(),
  author: z.string().uuid(),
  createdAt: z.string().datetime(),
});

const getChatMessages = getChatMessage.array();

const getUserChats = getChatRoom.array();

export type ChatRoom = z.infer<typeof getChatRoom>;
export type ChatMessage = z.infer<typeof getChatMessage>;

export default {
  room: {
    create: createChatRoom,
    get: getChatRoom,
  },
  message: {
    get: getChatMessages,
  },
  getByUser: getUserChats,
};
