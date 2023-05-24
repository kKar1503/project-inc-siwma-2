import { z } from 'zod';
import { zodParseToNumber } from '../../apiHelper';

const chatRequestBody = z.object({
  sellerId: z.string().uuid(),
  buyerId: z.string().uuid(),
  listingId: z.number(),
});

const chatMessageRequestQuery = z.object({
  id: z.string().uuid(),
  lastIdPointer: z.string().transform(zodParseToNumber).optional(),
  limit: z.string().transform(zodParseToNumber).optional(),
});

const chatRequestQuery = z.object({
  id: z.string().uuid(),
  lastIdPointer: z.string().uuid().optional(),
  limit: z.string().transform(zodParseToNumber).optional(),
});

export type PostChatRequestBody = z.infer<typeof chatRequestBody>;
export type GetChatMessageQueryParameter = z.infer<typeof chatMessageRequestQuery>;
export type GetChatRequestQueryParameter = z.infer<typeof chatRequestQuery>;

export default {
  messages: {
    get: {
      query: chatMessageRequestQuery,
    },
  },
  get: {
    query: chatRequestQuery,
  },
  post: {
    body: chatRequestBody,
  },
};
