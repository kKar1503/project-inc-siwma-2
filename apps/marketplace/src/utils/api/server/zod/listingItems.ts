import { z } from 'zod';
import {
  zodParseToInteger,
} from '../../apiHelper';

const getListingItemQueryParameters = z.object({
  lastIdPointer: z.string().transform(zodParseToInteger).optional(),
  limit: z.string().transform(zodParseToInteger).optional().default('10'),
  matching: z.string().optional(),
  category: z.number().optional(),
  sortBy: z.string().optional(),
});

// Listing items have been changed to products however it is still lisitng-items in the db

/**
 * We define a separate schema for the type of the request body
 * Because we want to perform a type transformation
 * But we when we perform z.infer<> we want to get the original type
 */
const listingItemRequestBodyType = z.object({
  name: z.string(),
  chineseName: z.string().optional(),
  description: z.string(),
  unit: z.string(),
  chineseUnit: z.string().optional(),
  categoryId: z.string(),
});

const listingItemRequestBody = listingItemRequestBodyType.extend({
  categoryId: z.string().transform(zodParseToInteger),
});

const putListingItemRequestBodyType = listingItemRequestBodyType.partial();
const putListingItemRequestBody = listingItemRequestBody.partial();

export type GetListingItemQueryParameter = z.infer<typeof getListingItemQueryParameters>;
export type PostListingItemRequestBody = z.infer<typeof listingItemRequestBodyType>;
export type PutListingItemRequestBody = z.infer<typeof putListingItemRequestBodyType>;

export default {
  get: {
    query: getListingItemQueryParameters,
  },
  post: {
    body: listingItemRequestBody,
  },
  put: {
    body: putListingItemRequestBody,
  },
};
