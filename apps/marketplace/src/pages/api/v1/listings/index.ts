import {
  apiHandler,
  formatAPIResponse,
  parseToNumber,
  zodParseToBoolean,
  zodParseToInteger,
  zodParseToNumber,
} from '@/utils/api';
import PrismaClient, { Listing, ListingType, Prisma } from '@inc/db';
import { z } from 'zod';
import { Decimal } from '@prisma/client/runtime';
import { NotFoundError, ParamError } from '@inc/errors';

export function parseListingId($id: string) {
  // Parse and validate listing id provided
  const id = parseToNumber($id, 'id');

  // Check if the listing id is valid
  if (Number.isNaN(id)) {
    throw new NotFoundError(`Listing with id '${id}'`);
  }

  return id;
}

/**
 * Fetches required parameters for a category
 * @param categoryId The category id
 * @returns An array of required parameter ids for the category
 */
async function getRequiredParametersForCategory(categoryId: number): Promise<number[]> {
  // Fetch required parameters for the category
  const categoryParameters = await PrismaClient.categoriesParameters.findMany({
    where: { categoryId, required: true },
  });

  // Return an array of required parameter ids
  return categoryParameters.map((param) => param.parameterId);
}

// -- Type definitions -- //
export type ListingResponse = {
  id: string;
  name: string;
  description: string;
  price: Decimal;
  unitPrice?: boolean;
  negotiable?: boolean;
  categoryId: string;
  type: ListingType;
  owner: string;
  parameters?: Array<{
    paramId: string;
    value: string;
  }>;
};

export type ListingWithParameters = Listing & {
  listingsParametersValues: Array<{
    parameterId: number;
    value: string;
  }>;
};

export const getQueryParameters = z.object({
  lastIdPointer: z.string().transform(zodParseToInteger).optional(),
  limit: z.string().transform(zodParseToInteger).optional(),
  matching: z.string().optional(),
  includeParameters: z.string().transform(zodParseToBoolean).optional().default('false'),
  category: z.string().transform(zodParseToInteger).optional(),
  negotiable: z.string().transform(zodParseToBoolean).optional(),
  minPrice: z.string().transform(zodParseToNumber).optional(),
  maxPrice: z.string().transform(zodParseToNumber).optional(),
  sortBy: z.string().optional(),
});

// -- Helper functions -- //
export function formatSingleListingResponse(
  listing: ListingWithParameters,
  includeParameters: boolean
): ListingResponse {
  const formattedListing: ListingResponse = {
    id: listing.id.toString(),
    name: listing.name,
    description: listing.description,
    price: listing.price,
    unitPrice: listing.unitPrice,
    negotiable: listing.negotiable,
    categoryId: listing.categoryId.toString(),
    type: listing.type,
    owner: listing.owner,
  };

  if (includeParameters && listing.listingsParametersValues) {
    formattedListing.parameters = listing.listingsParametersValues.map((parameter) => ({
      paramId: parameter.parameterId.toString(),
      value: parameter.value,
    }));
  }

  return formattedListing;
}

export function formatListingResponse(
  $listings: ListingWithParameters[],
  includeParameters: boolean
) {
  return $listings.map((listing) => formatSingleListingResponse(listing, includeParameters));
}

export const listingsRequestBody = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().gte(0),
  unitPrice: z.boolean().optional(),
  negotiable: z.boolean().optional(),
  categoryId: z.number(),
  type: z.nativeEnum(ListingType),
  parameters: z
    .array(
      z.object({
        paramId: z.string().transform(zodParseToInteger),
        value: z.string().transform(zodParseToNumber),
      })
    )
    .optional(),
});

export default apiHandler()
  .get(async (req, res) => {
    // Parse the query parameters
    const queryParams = getQueryParameters.parse(req.query);

    // Filter options
    const whereOptions: Prisma.ListingWhereInput = {
      categoryId: queryParams.category ? queryParams.category : undefined,
      negotiable: queryParams.negotiable ? queryParams.negotiable : undefined,
      price: {
        gte: queryParams.minPrice ? queryParams.minPrice : undefined,
        lte: queryParams.maxPrice ? queryParams.maxPrice : undefined,
      },
      name: queryParams.matching
        ? {
          contains: queryParams.matching,
          mode: 'insensitive',
        }
        : undefined,
    };

    // Sorting options
    let sortByOptions: Prisma.ListingOrderByWithAggregationInput = {
      id: 'asc',
    };

    if (queryParams.sortBy) {
      switch (queryParams.sortBy.toLowerCase()) {
        case 'price':
          sortByOptions = { price: 'asc' };
          break;
        default:
          break;
      }
    }

    // Retrieve filtered and sorted listings from the database
    const listings = await PrismaClient.listing.findMany({
      where: whereOptions,
      orderBy: sortByOptions,
      skip: queryParams.lastIdPointer,
      take: queryParams.limit,
      include: {
        listingsParametersValues: queryParams.includeParameters,
      },
    });

    res
      .status(200)
      .json(formatAPIResponse(formatListingResponse(listings, queryParams.includeParameters)));
  })
  .post(async (req, res) => {
    const data = listingsRequestBody.parse(req.body);

    // Use the user ID from the request object
    const userId = req.token?.user?.id;

    // Check if the category exists
    const categoryExists = await PrismaClient.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!categoryExists) {
      throw new ParamError('Category');
    }

    // Check if all required parameters for the category are provided
    const requiredParameters = await getRequiredParametersForCategory(data.categoryId);
    const providedParameters = data.parameters
      ? data.parameters.map((param) => param.paramId)
      : [];

    requiredParameters.forEach((reqParam) => {
      if (!providedParameters.includes(reqParam)) {
        throw new ParamError('paramId');
      }
    });

    const listing = await PrismaClient.listing.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        unitPrice: data.unitPrice,
        negotiable: data.negotiable,
        categoryId: data.categoryId,
        type: data.type,
        owner: userId,
        listingsParametersValues: data.parameters
          ? {
            create: data.parameters.map((parameter) => ({
              value: parameter.value.toString(),
              parameter: {
                connect: {
                  id: parameter.paramId,
                },
              },
            })),
          }
          : undefined,
      },
      include: {
        listingsParametersValues: true,
      },
    });

    res.status(201).json(formatAPIResponse({ listingId: listing.id }));
  });
