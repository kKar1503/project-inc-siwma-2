import { z } from 'zod';

const createChatRoom = z.object({
  room: z.string().uuid(),
});

const getChatRoom = z.object({
  id: z.string().uuid(),
  seller: z.string().uuid(),
  buyer: z.string().uuid(),
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

const getUserChat = z.object({
  id: z.string().uuid(),
  seller: z.string().uuid(),
  buyer: z.string().uuid(),
  listing: z.string(),
  createdAt: z.string().datetime(),
});

const getUserChats = getUserChat.array();

export type ChatRoom = z.infer<typeof getChatRoom>;
export type ChatMessage = z.infer<typeof getChatMessage>;
export type Chat = z.infer<typeof getUserChat>;

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
