import { z } from 'zod';
import { ListingType } from '@prisma/client';
import {
  zodDecodeToJson,
  zodParseToBoolean,
  zodParseToInteger,
  zodParseToNumber,
} from '../../apiHelper';

const getQueryParameters = z.object({
  lastIdPointer: z.string().transform(zodParseToInteger).optional(),
  limit: z.string().transform(zodParseToInteger).optional(),
  matching: z.string().optional(),
  includeParameters: z.string().transform(zodParseToBoolean).optional().default('true'),
  includeImages: z.string().transform(zodParseToBoolean).optional().default('false'),
  params: z.preprocess(
    zodDecodeToJson,
    z
      .object({
        paramId: z.string().transform(zodParseToInteger),
        value: z.string(),
      })
    )
    .optional(),
  category: z.string().transform(zodParseToInteger).optional(),
  negotiable: z.string().transform(zodParseToBoolean).optional(),
  minPrice: z.string().transform(zodParseToNumber).optional(),
  maxPrice: z.string().transform(zodParseToNumber).optional(),
  sortBy: z.string().optional(),
  type: z.nativeEnum(ListingType).optional(),
});

/**
 * We define a separate schema for the type of the request body
 * Because we want to perform a type transformation
 * But we when we perform z.infer<> we want to get the original type
 */
const listingsRequestBodyType = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().gte(0),
  unitPrice: z.boolean().optional(),
  negotiable: z.boolean().optional(),
  categoryId: z.string(),
  type: z.nativeEnum(ListingType),
  multiple: z.boolean().optional(),
  parameters: z
    .array(
      z.object({
        paramId: z.string(),
        value: z.string(),
      })
    )
    .optional(),
});

const listingsRequestBody = listingsRequestBodyType.extend({
  categoryId: z.string().transform(zodParseToInteger),
  parameters: z
    .array(
      z.object({
        paramId: z.string().transform(zodParseToInteger),
        value: z.string().transform(zodParseToNumber),
      })
    )
    .optional(),
});

const putListingRequestBodyType = listingsRequestBodyType.partial();
const putListingRequestBody = listingsRequestBody.partial();

const createParameterType = z.object({
  paramId: z.string(),
  value: z.string(),
});

const createParameter = createParameterType.extend({
  paramId: z.string().transform(zodParseToInteger),
  value: z.string().transform(zodParseToNumber),
});

const updateParametersType = z.array(createParameterType);
const updateParameters = z.array(createParameter);

// Add zod validation schema for review
const reviewRequestBody = z.object({
  review: z.string(),
  rating: z.number().int().gte(0).lte(5),
});

export type GetListingsQueryParameter = z.infer<typeof getQueryParameters>;
export type PostListingsRequestBody = z.infer<typeof listingsRequestBodyType>;
export type PutListingsRequestBody = z.infer<typeof putListingRequestBodyType>;
export type PostListingParameterRequestBody = z.infer<typeof createParameterType>;
export type PutListingParameterRequestBody = z.infer<typeof updateParametersType>;
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
