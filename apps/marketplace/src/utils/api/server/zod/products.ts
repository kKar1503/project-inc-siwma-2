import { z } from 'zod';
import { zodDecodeToJson, zodParseToInteger } from '../../apiHelper';

const getQueryParameters = z.object({
  lastIdPointer: z.string().transform(zodParseToInteger).optional(),
  limit: z.string().transform(zodParseToInteger).optional().default('10'),
  matching: z.string().optional(),
  params: z
    .preprocess(
      zodDecodeToJson,
      z.object({
        paramId: z.string().transform(zodParseToInteger),
        value: z.string(),
      })
    )
    .optional(),
});

export type GetProductsQueryParameter = z.infer<typeof getQueryParameters>;

const postBody = z.object({
  name: z.string(),
  chineseName: z.string(),
  description: z.string(),
  unit: z.string(),
  chineseUnit: z.string(),
  categoryId: z.string().transform(zodParseToInteger),
});

export default {
  get: {
    query: getQueryParameters,
  },
  post: {
    body: postBody,
  },
  put: {
    body: postBody.merge(
      z.object({
        id: z.string().transform(zodParseToInteger)
      })
    ),
  },
  delete: {
    parameters: z.object({
      id: z.string().transform(zodParseToInteger),
    }),
  },
};
