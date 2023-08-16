import { z } from 'zod';
import { zodParseToInteger } from '../../apiHelper';

const getProductQueryParameters = z.object({
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
const productRequestBodyType = z.object({
  name: z.string(),
  chineseName: z.string().optional(),
  description: z.string(),
  unit: z.string(),
  chineseUnit: z.string().optional(),
  categoryId: z.string(),
});

const productRequestBody = productRequestBodyType.extend({
  categoryId: z.string().transform(zodParseToInteger),
});

const putProductRequestBodyType = productRequestBodyType.partial();
const putProductRequestBody = productRequestBody.partial();

export type GetProductQueryParameter = z.infer<typeof getProductQueryParameters>;
export type PostProductRequestBody = z.infer<typeof productRequestBodyType>;
export type PutProductRequestBody = z.infer<typeof putProductRequestBodyType>;

export default {
  get: {
    query: getProductQueryParameters,
  },
  post: {
    body: productRequestBody,
  },
  put: {
    body: putProductRequestBody,
  },
};
