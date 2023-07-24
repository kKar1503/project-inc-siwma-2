import { z } from 'zod';
import { zodParseToInteger, zodParseToNumber } from '../../apiHelper';

/**
 * We define a separate schema for the type of the request body
 * Because we want to perform a type transformation
 * But we when we perform z.infer<> we want to get the original type
 */
const chatRequestBodyType = z.object({
  sellerId: z.string().uuid(),
  buyerId: z.string().uuid(),
  listingId: z.string(),
});

const chatRequestBody = chatRequestBodyType.extend({
  listingId: z.string().transform(zodParseToInteger),
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

const chatMessagesRequestBody = z.object({
  message: z.string(),
  sender: z.string(),
});

export type PostChatRequestBody = z.infer<typeof chatRequestBodyType>;
export type GetChatMessageQueryParameter = z.infer<typeof chatMessageRequestQuery>;
export type GetChatRequestQueryParameter = z.infer<typeof chatRequestQuery>;

export default {
  messages: {
    get: {
      query: chatMessageRequestQuery,
    },
    post: {
      body: chatMessagesRequestBody,
    },
  },
  get: {
    query: chatRequestQuery,
  },
  post: {
    body: chatRequestBody,
  },
};