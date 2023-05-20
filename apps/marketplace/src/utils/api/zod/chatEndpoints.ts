import { z } from 'zod';

export const createChatRoom = z.object({
  room: z.string().uuid(),
});

export const getChatRoom = z.object({
  id: z.string().uuid(),
  seller: z.string().uuid(),
  buyer: z.string().uuid(),
});

export const getChatMessages = z
  .object({
    id: z.string(),
    content_type: z.string(),
    read: z.boolean(),
    content: z.string().optional(),
    offer: z.string().optional().transform((val) => val ? Number(val) : undefined),
    author: z.string().uuid(),
    created_at: z.date(),
  })
  .array();

export const getUserChats = z
  .object({
    id: z.string().uuid(),
    seller: z.string().uuid(),
    buyer: z.string().uuid(),
    listing: z.string(),
    created_at: z.date(),
  })
  .array();
