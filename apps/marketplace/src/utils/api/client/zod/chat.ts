import { ListingType } from '@inc/db-enums';
import { z } from 'zod';

const createChatRoom = z.object({
  room: z.string().uuid(),
});

const user = z.object({
  id: z.string().uuid(),
  name: z.string(),
  profilePicture: z.string().nullable(),
  enabled: z.boolean(),
});

const listing = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  unit: z.string(),
  type: z.nativeEnum(ListingType),
  open: z.boolean(),
  purchased: z.boolean(),
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

const getChatRoom = z.object({
  id: z.string().uuid(),
  seller: user,
  buyer: user,
  listing,
  latestMessage: getChatMessage.optional(),
  unreadMessagesCount: z.number(),
  createdAt: z.string().datetime(),
});

// const getChatMessages = getChatMessage.array();

const getUserChats = getChatRoom.array();

export type ChatRoom = z.infer<typeof getChatRoom>;
export type ChatMessage = z.infer<typeof getChatMessage>;

export default {
  room: {
    create: createChatRoom,
    get: getChatRoom,
  },
  // message: {
  //   get: getChatMessages,
  // },
  getByUser: getUserChats,
};
