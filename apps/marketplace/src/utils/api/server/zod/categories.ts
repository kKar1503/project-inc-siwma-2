import { z } from 'zod';

export const getCategoriesQueryParameter = z.object({
  includeParameters: z.string().optional(),
});

export const categoryRequestBody = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  crossSectionImage: z.string(),
  parameters: z
    .object({
      parameterId: z.number(),
      required: z.boolean(),
    })
    .array(),
});

const editCategoryRequestBody = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  crossSectionImage: z.string().optional(),
  parameters: z
    .object({
      parameterId: z.number(),
      required: z.boolean(),
    })
    .array()
    .optional(),
});

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
