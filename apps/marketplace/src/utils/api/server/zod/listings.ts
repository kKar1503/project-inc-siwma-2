import { z } from 'zod';
import { ListingType } from '@prisma/client';
import { zodParseToBoolean, zodParseToInteger, zodParseToNumber } from '../../apiHelper';

const getQueryParameters = z.object({
  lastIdPointer: z.string().transform(zodParseToInteger).optional(),
  limit: z.string().transform(zodParseToInteger).optional(),
  matching: z.string().optional(),
  includeParameters: z.string().transform(zodParseToBoolean).optional().default('true'),
  params: z.string().optional(),
  category: z.string().transform(zodParseToInteger).optional(),
  negotiable: z.string().transform(zodParseToBoolean).optional(),
  minPrice: z.string().transform(zodParseToNumber).optional(),
  maxPrice: z.string().transform(zodParseToNumber).optional(),
  sortBy: z.string().optional(),
});

const listingsRequestBody = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().gte(0),
  unitPrice: z.boolean().optional(),
  negotiable: z.boolean().optional(),
  categoryId: z.number(),
  type: z.nativeEnum(ListingType),
  multiple: z.boolean().optional(),
  parameters: z
    .array(
      z.object({
        paramId: z.string().transform(zodParseToInteger),
        value: z.string().transform(zodParseToNumber),
      })
    )
    .optional(),
});

const putListingRequestBody = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().gte(0).optional(),
  unitPrice: z.boolean().optional(),
  negotiable: z.boolean().optional(),
  categoryId: z.number().optional(),
  type: z.nativeEnum(ListingType).optional(),
  multiple: z.boolean().optional(),
  parameters: z
    .array(
      z.object({
        paramId: z.string().transform(zodParseToInteger),
        value: z.string().transform(zodParseToNumber),
      })
    )
    .optional(),
});

const createParameter = z.object({
  paramId: z.string().transform(zodParseToInteger),
  value: z.string().transform(zodParseToNumber),
});

const updateParameters = z.array(createParameter);

// Add zod validation schema for review
const reviewRequestBody = z.object({
  review: z.string(),
  rating: z.number().int().gte(0).lte(5),
});


export type GetListingsQueryParameter = z.infer<typeof getQueryParameters>;
export type PostListingsRequestBody = z.infer<typeof listingsRequestBody>;
export type PutListingsRequestBody = z.infer<typeof putListingRequestBody>;
export type PostListingParameterRequestBody = z.infer<typeof createParameter>;
export type PutListingParameterRequestBody = z.infer<typeof updateParameters>;
export type ReviewRequestBody = z.infer<typeof reviewRequestBody>;

export default {
  get: {
    query: getQueryParameters,
  },
  post: {
    body: listingsRequestBody,
  },
  put: {
    body: putListingRequestBody,
  },
  parameters: {
    post: {
      body: createParameter,
    },
    put: {
      body: updateParameters,
    },
  },
  reviews: {
    post: {
      body: reviewRequestBody,
    },
  },

};
