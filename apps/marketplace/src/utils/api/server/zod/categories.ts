import { z } from 'zod';
import { zodParseToInteger } from '../../apiHelper';

export const getCategoriesQueryParameter = z.object({
  includeParameters: z.string().optional(),
});

export const categoryRequestBody = z.object({
  name: z.string(),
  description: z.string(),
  parameters: z
    .object({
      parameterId: z.string().transform(zodParseToInteger),
      required: z.boolean(),
    })
    .array(),
});

const editCategoryRequestBody = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  parameters: z
    .object({
      parameterId: z.string().transform(zodParseToInteger),
      required: z.boolean(),
    })
    .array()
    .optional(),
});

export type GetCategoriesQueryParameter = z.infer<typeof getCategoriesQueryParameter>;
export type PostCategoryRequestBody = z.infer<typeof categoryRequestBody>;
export type PutCategoryRequestBody = z.infer<typeof editCategoryRequestBody>;

export default {
  get: {
    query: getCategoriesQueryParameter,
  },
  post: {
    body: categoryRequestBody,
  },
  put: {
    body: editCategoryRequestBody,
  },
};
