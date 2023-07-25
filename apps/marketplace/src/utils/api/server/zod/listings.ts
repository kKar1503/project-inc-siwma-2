import { z } from 'zod';
import { ListingType } from '@inc/db-enums';
import {
  zodDecodeToJson,
  zodParseToBoolean,
  zodParseToInteger,
  zodParseToNumber,
} from '../../apiHelper';

const getQueryParameters = z.object({
  lastIdPointer: z.string().transform(zodParseToInteger).optional(),
  limit: z.string().transform(zodParseToInteger).default('10').optional(),
  matching: z.string().optional(),
  includeName: z.string().transform(zodParseToBoolean).default('false').optional(),
  includeParameters: z.string().transform(zodParseToBoolean).default('true').optional(),
  params: z
    .preprocess(
      zodDecodeToJson,
      z.object({
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
  productId: z.string().transform(zodParseToInteger).optional(),
});

/**
 * We define a separate schema for the type of the request body
 * Because we want to perform a type transformation
 * But we when we perform z.infer<> we want to get the original type
 */
const listingsRequestBodyType = z.object({
  productId: z.string(),
  quantity: z.number().gt(0),
  price: z.number().gt(0),
  negotiable: z.boolean().optional(),
  type: z.nativeEnum(ListingType),
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
  productId: z.string().transform(zodParseToInteger),
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
