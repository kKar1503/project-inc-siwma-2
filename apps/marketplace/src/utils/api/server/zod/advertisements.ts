import { z } from 'zod';
import { zodParseToInteger } from '../../apiHelper';

const postAdvertisementRequestBody = z.object({
  companyId: z.string().transform(zodParseToInteger),
  endDate: z.string().datetime(),
  startDate: z.string().datetime(),
  active: z.boolean(),
  description: z.string(),
  link: z.string(),
});

const getAdvertisementQueryParams = z.object({
  lastIdPointer: z.string().transform(zodParseToInteger).optional(),
  limit: z.string().transform(zodParseToInteger).optional(),
});

const putAdvertisementRequestBody = postAdvertisementRequestBody.partial();

export type GetAdvertisementQueryParameter = z.infer<typeof getAdvertisementQueryParams>;
export type PostAdvertisementRequestBody = z.infer<typeof postAdvertisementRequestBody>;

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
