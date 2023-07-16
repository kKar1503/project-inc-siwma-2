import { z } from 'zod';
import {
  zodDecodeToJson,
  zodParseToInteger,
} from '../../apiHelper';

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
    .optional()
});

export type GetProductsQueryParameter = z.infer<typeof getQueryParameters>;

export default {
  get: {
    query: getQueryParameters,
  },
};
