import { MeiliSearch } from 'meilisearch';
import {
  apiHandler,
  formatAPIResponse,
  handleBookmarks,
  parseToNumber,
  UpdateType,
} from '@/utils/api';
import PrismaClient, {
  Companies,
  Listing,
  ListingItem,
  ListingsParametersValue,
  Messages,
  Prisma,
  Users,
} from '@inc/db';
import { ParamError, ParamInvalidError, ParamRequiredError } from '@inc/errors';
import { GetListingsQueryParameter, listingSchema } from '@/utils/api/server/zod';
import { ListingResponseBody } from '@/utils/api/client/zod';
import type { TMeilisearchListingParameter, TMeilisearchListing } from '@/types/listing';
import type { ListingParameter } from '@inc/types';

export type ListingWithParameters = Listing & {
  listingItem: ListingItem;
  listingsParametersValue: ListingsParametersValue | null;
  offers: Array<{
    accepted: boolean;
    messages?: Array<Pick<Messages, 'author'>>;
  }>;
  users: Users & {
    companies: Companies;
  };
};

/**
 * Obtains the listing id from the url
 * @example // Listing url: /api/v1/listings/1; Returns { name: '', id: 1 }
 * @example // Listing url: /api/v1/listings/some-listing-name-1; Returns { name: 'some listing name', id: 1 }
 */
export function parseListingId($id: string, strict = true) {
  // Check if strict mode is set
  if (strict) {
    // Attempt to parse the listing id
    return parseToNumber($id, 'id');
  }

  // Attempt to retrieve the listing id and name from the url
  const id = $id.split('-').pop() || '';

  // Parse and validate listing id provided
  return parseToNumber(id, 'id');
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

function orderByOptions(sortBy: string | undefined): Prisma.ListingOrderByWithRelationInput {
  switch (sortBy) {
    case 'price_desc':
      return { price: 'desc' };
    case 'price_asc':
      return { price: 'asc' };
    case 'recent_newest':
      return { createdAt: 'desc' };
    case 'recent_oldest':
      return { createdAt: 'asc' };
    case 'popularity_desc':
      return { listingClicksListingClicksListingTolistings: { _count: 'desc' } };
    case 'popularity_asc':
      return { listingClicksListingClicksListingTolistings: { _count: 'asc' } };
    default:
      return { id: 'asc' };
  }
}

function postSortOptions(
  sortBy: string | undefined
): (arr: ListingWithParameters[]) => ListingWithParameters[] {
  switch (sortBy) {
    default:
      return (arr) => arr;
  }
}

export function sortOptions(sortByStr: string | undefined) {
  const sortBy = sortByStr ? sortByStr.toLowerCase() : undefined;
  return {
    orderBy: orderByOptions(sortBy),
    postSort: postSortOptions(sortBy),
  };
}

// -- Helper functions -- //
export async function formatSingleListingResponse(
  listing: ListingWithParameters,
  userId: string,
  config?: {
    includeParameters?: boolean;
    includeName?: boolean;
  }
): Promise<ListingResponseBody> {
  const formattedListing: ListingResponseBody = {
    id: listing.id.toString(),
    productId: listing.listingItemId.toString(),
    price: listing.price.toNumber(),
    quantity: listing.quantity.toNumber(),
    negotiable: listing.negotiable,
    type: listing.type,
    owner: {
      id: listing.users.id,
      name: listing.users.name,
      email: listing.users.email,
      company: {
        id: listing.users.companyId.toString(),
        name: listing.users.companies.name,
        website: listing.users.companies.website,
        bio: listing.users.companies.bio,
        image: listing.users.companies.logo,
        visible: listing.users.companies.visibility,
      },
      profilePic: listing.users.profilePicture,
      mobileNumber: listing.users.phone,
      contactMethod: listing.users.contact,
      bio: listing.users.bio,
    },
    open: listing.quantity.toNumber() > 0,
    createdAt: listing.createdAt.toISOString(),
    // Whether or not the user has purchased the listing
    purchased: listing.offers.some(
      (offer) => offer.accepted && offer.messages?.some((message) => message.author === userId)
    ),
  };

  if (
    config?.includeParameters &&
    listing.listingsParametersValue &&
    listing.listingsParametersValue.parameters
  ) {
    formattedListing.parameters = (
      listing.listingsParametersValue.parameters as ListingParameter[]
    ).map((parameter) => ({
      paramId: parameter.parameterId.toString(),
      value: parameter.value,
    }));
  }

  if (config?.includeName) {
    formattedListing.name = listing.listingItem.name;
  }

  return formattedListing;
}

const getListingWhere = (
  queryParams: GetListingsQueryParameter,
  isAdmin: boolean
): Prisma.ListingWhereInput => ({
  listingItem: {
    categoryId: queryParams.category ? queryParams.category : undefined,
    name: queryParams.matching
      ? {
          contains: queryParams.matching,
          mode: 'insensitive',
        }
      : undefined,
  },
  listingItemId: queryParams.productId ? queryParams.productId : undefined,
  negotiable: queryParams.negotiable != null ? queryParams.negotiable : undefined,
  price: {
    gte: queryParams.minPrice ? queryParams.minPrice : undefined,
    lte: queryParams.maxPrice ? queryParams.maxPrice : undefined,
  },
  quantity: {
    gt: isAdmin ? undefined : 0,
  },
  type: queryParams.type ? queryParams.type : undefined,
  listingsParametersValue: queryParams.params
    ? {
        parameters: {
          array_contains: [
            {
              parameterId: queryParams.params.paramId,
              value: queryParams.params.value,
            },
          ],
        },
      }
    : undefined,
  deletedAt: {
    equals: null,
  },
});

export default apiHandler()
  .get(async (req, res) => {
    // Parse the query parameters
    const queryParams = listingSchema.get.query.parse(req.query);
    const { orderBy, postSort } = sortOptions(queryParams.sortBy);

    // Obtain the user's ID & status
    const userId = req.token?.user.id;
    const isAdmin = req.token?.user.permissions === 1;

    // Get total count ignoring pagination
    const totalCount = await PrismaClient.listing.count({
      where: getListingWhere(queryParams, isAdmin),
    });

    // Retrieve filtered and sorted listings from the database
    const listings = await PrismaClient.listing.findMany({
      where: getListingWhere(queryParams, isAdmin),
      orderBy,
      skip: queryParams.lastIdPointer,
      take: queryParams.limit,
      include: {
        listingItem: true,
        listingsParametersValue: queryParams.includeParameters,
        offers: {
          select: {
            accepted: true,
            messages: {
              select: {
                author: true,
              },
            },
          },
        },
        users: {
          include: {
            companies: true,
          },
        },
      },
    });

    const sortedListings = postSort(listings);

    // Format the listings
    const formattedListings = await Promise.all(
      sortedListings.map((listing) =>
        formatSingleListingResponse(listing, userId, {
          ...queryParams,
        })
      )
    );

    res.status(200).json(formatAPIResponse({ totalCount, listings: formattedListings }));
  })
  .post(async (req, res) => {
    const client = new MeiliSearch({
      host: process.env.MEILI_URL as string,
      apiKey: process.env.MEILI_MASTER_KEY as string,
    });

    const data = listingSchema.post.body.parse(req.body);

    // Use the user ID from the request object
    const userId = req.token?.user?.id;

    // Check if the listing item exists
    let listingItem = await PrismaClient.listingItem.findUnique({
      where: { id: data.productId },
    });

    if (!listingItem) {
      throw new ParamError('listing item');
    }

    // Check if all required parameters for the category are provided
    const requiredParameters = await getRequiredParametersForCategory(listingItem.categoryId);
    const providedParameters = data.parameters ? data.parameters.map((param) => param.paramId) : [];

    requiredParameters.forEach((reqParam) => {
      if (!providedParameters.includes(reqParam)) {
        throw new ParamRequiredError('paramId');
      }
    });

    // Check if any of the provided parameters are invalid
    providedParameters.forEach((param) => {
      if (!requiredParameters.includes(param)) {
        throw new ParamInvalidError('paramId', param);
      }
    });

    // ** completed listing
    const listing = await PrismaClient.listing.create({
      data: {
        listingItemId: data.productId,
        quantity: data.quantity,
        price: data.price,
        negotiable: data.negotiable,
        type: data.type,
        owner: userId,
        listingsParametersValue: data.parameters
          ? {
              create: {
                parameters: data.parameters.map((parameter) => ({
                  parameterId: parameter.paramId,
                  value: parameter.value.toString(),
                })),
              },
            }
          : undefined,
      },
      include: {
        listingsParametersValue: true,
      },
    });

    listingItem = await PrismaClient.listingItem.findUnique({
      where: { id: listing.listingItemId },
    });

    if (!listingItem) {
      throw new ParamError('listing item');
    }

    if (!(await client.getIndex('listings'))) {
      await client.createIndex('listings');
    }

    const parameters: Array<TMeilisearchListingParameter> = [];

    (
      listing.listingsParametersValue?.parameters as Array<{
        parameterId: number;
        value: string;
      }>
    ).forEach(async (param) =>
    parameters.push({
        paramName: (
          await PrismaClient.parameter.findUnique({
            where: { id: param.parameterId },
          })
        )?.name as string,
        value: param.value,
      })
    );

    await client.index<TMeilisearchListing>('listings').addDocuments([
      {
        id: listing.id,
        name: listingItem.name,
        chineseName: listingItem.chineseName,
        description: listingItem.description,
        price: listing.price.toNumber(),
        parameters,
      },
    ]);

    handleBookmarks(UpdateType.CREATE, listing);

    res.status(201).json(formatAPIResponse({ listingId: listing.id }));
  });
