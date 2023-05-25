import { z } from 'zod';

const createChatRoom = z.object({
  room: z.string().uuid(),
});

const getChatRoom = z.object({
  id: z.string().uuid(),
  seller: z.string().uuid(),
  buyer: z.string().uuid(),
});

const getChatMessages = z
  .object({
    id: z.string(),
    contentType: z.string(),
    read: z.boolean(),
    content: z.string().optional(),
    offer: z.number().optional(),
    author: z.string().uuid(),
    createdAt: z.string().datetime(),
  })
  .array();

const getUserChats = z
  .object({
    id: z.string().uuid(),
    seller: z.string().uuid(),
    buyer: z.string().uuid(),
    listing: z.string(),
    createdAt: z.string().datetime(),
  })
  .array();

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
