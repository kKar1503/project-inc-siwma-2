import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient, { Prisma } from '@inc/db';
import {
  Listing,
  getQueryParameters,
  TSortableField,
  TSortableDirection,
  Pagination,
} from '@/utils/api/server/zod/listingTable';

function getOrderBy(
  sortBy: TSortableField = 'createdAt',
  sortDirection: TSortableDirection = 'desc'
): Prisma.ListingOrderByWithRelationInput {
  switch (sortBy) {
    case 'name':
      return {
        listingItem: {
          name: sortDirection,
        },
      };
    case 'price':
    case 'quantity':
    case 'createdAt':
    default: {
      const sortByReturn: Prisma.ListingOrderByWithRelationInput = {};
      sortByReturn[sortBy] = sortDirection;
      return sortByReturn;
    }
  }
}

function generatePaginationDetails(total: number, limit: number, supposedPage: number): Pagination {
  const pageRequirement = supposedPage * limit;
  const hasEnoughPage = pageRequirement < total;
  const page = hasEnoughPage
    ? supposedPage
    : Math.max(Math.ceil((pageRequirement - limit) / limit), 0);
  // ^ Defaults to page 0
  const totalPage = Math.ceil(total / limit);
  const nextPage = page + 1 > totalPage ? null : page + 1;
  const prevPage = page === 0 ? null : page - 1;

  return {
    totalPage,
    totalCount: total,
    page,
    limit,
    nextPage,
    prevPage,
  };
}

export default apiHandler().get(async (req, res) => {
  // Parse the query parameters
  const queryParams = getQueryParameters.parse(req.query);

  // Sorting
  const orderBy = getOrderBy(queryParams.sortBy, queryParams.sortDirection);

  // Get total count ignoring pagination
  const total = await PrismaClient.listing.count({
    where: {
      listingItem: {
        categoryId: queryParams.categoryId,
      },
      deletedAt: {
        equals: null,
      },
    },
  });

  // Use the page count to calculate the skip
  const pageRequirement = queryParams.page * queryParams.limit;
  const hasEnoughPage = pageRequirement < total;
  const skip = hasEnoughPage ? pageRequirement : Math.max(pageRequirement - queryParams.limit, 0);
  // ^ defaults to 0 if we somehow run out of listing (edge case)

  // Retrieve filtered and sorted listings from the database
  const listings = await PrismaClient.listing.findMany({
    where: {
      listingItem: {
        categoryId: queryParams.categoryId,
      },
      deletedAt: {
        equals: null,
      },
    },
    orderBy,
    skip,
    take: queryParams.limit,
    select: {
      id: true,
      price: true,
      negotiable: true,
      quantity: true,
      type: true,
      createdAt: true,
      listingItemId: true,
      users: {
        select: {
          id: true,
          name: true,
          profilePicture: true,
          companies: {
            select: {
              name: true,
              website: true,
            },
          },
        },
      },
      listingsParametersValue: {
        select: {
          parameters: true,
        },
      },
    },
  });

  const formattedListings: Listing[] = listings.map((l) => {
    const {
      listingsParametersValue,
      users,
      id,
      price,
      quantity,
      createdAt,
      listingItemId,
      ...rest
    } = l;
    const { profilePicture, companies, ...owner } = users;
    return {
      ...rest,
      id: id.toString(),
      price: price.toNumber(),
      quantity: quantity.toNumber(),
      createdAt: createdAt.toISOString(),
      product: listingItemId.toString(),
      owner: {
        ...owner,
        profilePic: profilePicture,
        company: companies,
      },
      parameters:
        listingsParametersValue === null
          ? []
          : (listingsParametersValue.parameters as Listing['parameters']),
    };
  });

  const pagination = generatePaginationDetails(total, queryParams.limit, queryParams.page);

  res.status(200).json(formatAPIResponse({ pagination, listings: formattedListings }));
});
