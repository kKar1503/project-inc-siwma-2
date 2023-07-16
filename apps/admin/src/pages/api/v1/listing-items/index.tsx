import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import PrismaClient, { ListingItem, Prisma } from '@inc/db';
import { ParamError } from '@inc/errors';
import {
  GetListingItemQueryParameter,
  listingItemSchema,
} from '@/utils/api/server/zod';
import { ListingItemResponseBody } from '@/utils/api/client/zod/listingItems';

/**
 * Obtains the listingITem id from the url
 * @example // Listing url: /api/v1/listingItem/1; Returns { name: '', id: 1 }
 * @example // Listing url: /api/v1/listingItem/some-listing-name-1; Returns { name: 'some listing name', id: 1 }
 */
export function parseListingItemId($id: string, strict = true) {
  // Check if strict mode is set
  if (strict) {
    // Attempt to parse the listingItem id
    return parseToNumber($id, 'id');
  }

  // Attempt to retrieve the listing id and name from the url
  const id = $id.split('-').pop() || '';

  // Parse and validate listing id provided
  return parseToNumber(id, 'id');
}

function orderByOptions(sortBy: string | undefined): Prisma.ListingItemOrderByWithRelationInput {
  switch (sortBy) {
    case 'recent_newest':
      return { createdAt: 'desc' };
    case 'recent_oldest':
      return { createdAt: 'asc' };
    default:
      return { id: 'asc' };
  }
}

export function sortOptions(sortByStr: string | undefined) {
  const sortBy = sortByStr ? sortByStr.toLowerCase() : undefined;
  return {
    orderBy: orderByOptions(sortBy),
  };
}

// -- Helper functions -- //
export async function formatSingleListingResponse(
  listingItem: ListingItem
): Promise<ListingItemResponseBody> {
  const formattedListingItem: ListingItemResponseBody = {
    id: listingItem.id.toString(),
    name: listingItem.name,
    chineseName: listingItem.chineseName as string,
    description: listingItem.description,
    unit: listingItem.unit,
    chineseUnit: listingItem.chineseUnit as string,
    categoryId: listingItem.categoryId.toString(),
    createdAt: listingItem.createdAt.toISOString(),
  };

  return formattedListingItem;
}

const getListingItemsWhere = (
  queryParams: GetListingItemQueryParameter
): Prisma.ListingItemWhereInput => ({
  categoryId: queryParams.category ? queryParams.category : undefined,
  name: queryParams.matching
    ? {
        contains: queryParams.matching,
        mode: 'insensitive',
      }
    : undefined,
});

export default apiHandler()
  .get(async (req, res) => {
    // Parse the query parameters
    const queryParams = listingItemSchema.get.query.parse(req.query);

    const { orderBy } = sortOptions(queryParams.sortBy);

    // Get total count ignoring pagination
    const totalCount = await PrismaClient.listing.count({
      where: getListingItemsWhere(queryParams),
    });

    // Retrieve filtered and sorted listings from the database
    const listingItems = await PrismaClient.listingItem.findMany({
      where: getListingItemsWhere(queryParams),
      orderBy,
      skip: queryParams.lastIdPointer,
      take: queryParams.limit,
    });

    res.status(200).json(formatAPIResponse({ totalCount }));
  })
  .post(async (req, res) => {
    const data = listingItemSchema.post.body.parse(req.body);

    // Check if the category exists
    const categoryExists = await PrismaClient.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!categoryExists) {
      throw new ParamError('Category');
    }

    const listingItem = await PrismaClient.listingItem.create({
      data: {
        name: data.name,
        chineseName: data.chineseName,
        description: data.description,
        categoryId: data.categoryId,
        unit: data.unit,
        chineseUnit: data.chineseUnit,
      },
    });

    res.status(201).json(formatAPIResponse({ listingItemId: listingItem.id }));
  });
