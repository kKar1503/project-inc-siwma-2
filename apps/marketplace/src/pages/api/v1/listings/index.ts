import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import PrismaClient, { Listing, Prisma, Users, Companies } from '@inc/db';
import { NotFoundError, ParamError } from '@inc/errors';
import { listingSchema } from '@/utils/api/server/zod';
import { ListingResponseBody } from '@/utils/api/client/zod';

export type ListingWithParameters = Listing & {
  listingsParametersValues: Array<{
    parameterId: number;
    value: string;
  }>;
  offersOffersListingTolistings: Array<{
    accepted: boolean;
  }>;
  users: Users & {
    companies: Companies;
  };
};

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

// -- Helper functions -- //
export function formatSingleListingResponse(
  listing: ListingWithParameters,
  includeParameters: boolean
): ListingResponseBody {
  const formattedListing: ListingResponseBody = {
    id: listing.id.toString(),
    name: listing.name,
    description: listing.description,
    price: listing.price.toNumber(),
    unitPrice: listing.unitPrice,
    negotiable: listing.negotiable,
    categoryId: listing.categoryId.toString(),
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
    open: !listing.offersOffersListingTolistings?.some((offer) => offer.accepted),
    createdAt: listing.createdAt.toISOString(),
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

export default apiHandler()
  .get(async (req, res) => {
    // Parse the query parameters
    const queryParams = listingSchema.get.query.parse(req.query);

    // Decode params if it exists
    let decodedParams = null;
    if (queryParams.params) {
      decodedParams = JSON.parse(decodeURI(queryParams.params));
      if (typeof decodedParams.paramId !== 'string' && typeof decodedParams.value !== 'string') {
        throw new ParamError('paramId and value');
      }
      if (typeof decodedParams.paramId !== 'string') {
        throw new ParamError('paramId');
      }
      if (typeof decodedParams.value !== 'string') {
        throw new ParamError('value');
      }
    }

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
      listingsParametersValues: decodedParams
        ? {
            some: {
              parameterId: Number(decodedParams.paramId),
              value: decodedParams.value,
            },
          }
        : undefined,
    };

    // Sorting options
    let sortByOptions: Prisma.ListingOrderByWithAggregationInput = {
      id: 'asc',
    };

    if (queryParams.sortBy) {
      switch (queryParams.sortBy.toLowerCase()) {
        case 'price_desc':
          sortByOptions = { price: 'desc' };
          break;
        case 'price_asc':
          sortByOptions = { price: 'asc' };
          break;
        case 'recent_newest':
          sortByOptions = { createdAt: 'desc' };
          break;
        case 'recent_oldest':
          sortByOptions = { createdAt: 'asc' };
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
        offersOffersListingTolistings: true,
        users: {
          include: {
            companies: true,
          },
        },
      },
    });

    res
      .status(200)
      .json(
        formatAPIResponse(
          formatListingResponse(
            listings as unknown as ListingWithParameters[],
            queryParams.includeParameters
          )
        )
      );
  })
  .post(async (req, res) => {
    const data = listingSchema.post.body.parse(req.body);

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
    const providedParameters = data.parameters ? data.parameters.map((param) => param.paramId) : [];

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
