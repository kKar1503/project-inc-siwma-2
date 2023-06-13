import { z } from 'zod';
import { zodParseToInteger } from '../../apiHelper';

/**
 * We define a separate schema for the type of the request body
 * Because we want to perform a type transformation
 * But we when we perform z.infer<> we want to get the original type
 */
const postAdvertisementRequestBodyType = z.object({
  companyId: z.string(),
  endDate: z.string().datetime(),
  startDate: z.string().datetime(),
  active: z.boolean(),
  description: z.string(),
  link: z.string(),
});

const postAdvertisementRequestBody = postAdvertisementRequestBodyType.extend({
  companyId: z.string().transform(zodParseToInteger),
});

const getAdvertisementQueryParams = z.object({
  lastIdPointer: z.string().transform(zodParseToInteger).optional(),
  limit: z.string().transform(zodParseToInteger).optional(),
});

const putAdvertisementRequestBody = postAdvertisementRequestBody.partial();

export type GetAdvertisementQueryParameter = z.infer<typeof getAdvertisementQueryParams>;
export type PostAdvertisementRequestBody = z.infer<typeof postAdvertisementRequestBodyType>;

export default {
  post: {
    body: postAdvertisementRequestBody,
  },
  get: {
    query: getAdvertisementQueryParams,
  },
  put: {
    body: putAdvertisementRequestBody,
  },
};
