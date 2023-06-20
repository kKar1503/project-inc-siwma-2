import { apiHandler, formatAPIResponse, handleBookmarks, parseToNumber, UpdateType } from '@/utils/api';
import PrismaClient, { Companies, Listing, Prisma, Users } from '@inc/db';
import { ParamError } from '@inc/errors';
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
  listingImages: Array<{
    image: string;
  }>;
  users: Users & {
    companies: Companies;
  };
  multiple: boolean;
  rating: number | null;
  reviewCount: number;
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

function ratingSortFn(a: ListingWithParameters, b: ListingWithParameters): number {
  if (a.rating === null) return b.rating === null ? 0 : b.rating;
  if (b.rating === null) return -a.rating;
  return b.rating - a.rating;
}

function postSortOptions(
  sortBy: string | undefined
): (arr: ListingWithParameters[]) => ListingWithParameters[] {
  switch (sortBy) {
    case 'rating_desc':
      return (arr) => arr.sort(ratingSortFn);
    case 'rating_asc':
      return (arr) => arr.sort(ratingSortFn).reverse();
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
  includeParameters: boolean
): Promise<ListingResponseBody> {
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
    images: listing.listingImages.map((image) => image.image),
    coverImage: listing.listingImages.length === 0
      ? ''
      : listing.listingImages[0].image,
    open: listing.multiple
      ? true
      : !listing.offersOffersListingTolistings?.some((offer) => offer.accepted),
    multiple: listing.multiple,
    createdAt: listing.createdAt.toISOString(),
    rating: listing.rating,
    reviewCount: listing.reviewCount,
  };

  if (includeParameters && listing.listingsParametersValues) {
    formattedListing.parameters = listing.listingsParametersValues.map((parameter) => ({
      paramId: parameter.parameterId.toString(),
      value: parameter.value,
    }));
  }

  return formattedListing;
}

export default apiHandler()
  .get(async (req, res) => {
    // Parse the query parameters
    const queryParams = listingSchema.get.query.parse(req.query);

    const { orderBy, postSort } = sortOptions(queryParams.sortBy);

    // Get total count ignoring pagination
    const totalCount = await PrismaClient.listing.count({
      where: {
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
        listingsParametersValues: queryParams.params
          ? {
            some: {
              parameterId: queryParams.params.paramId,
              value: queryParams.params.value,
            },
          }
          : undefined,
      },
    });

    // Retrieve filtered and sorted listings from the database
    const listings = await PrismaClient.listing.findMany({
      where: {
        categoryId: queryParams.category ? queryParams.category : undefined,
        negotiable: queryParams.negotiable != null ? queryParams.negotiable : undefined,
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
        listingsParametersValues: queryParams.params
          ? {
            some: {
              parameterId: queryParams.params.paramId,
              value: queryParams.params.value,
            },
          }
          : undefined,
      },
      orderBy,
      skip: queryParams.lastIdPointer,
      take: queryParams.limit,
      include: {
        listingImages: {
          orderBy: {
            order: 'asc',
          }
        },
        listingsParametersValues: queryParams.includeParameters,
        offersOffersListingTolistings: true,
        users: {
          include: {
            companies: true,
          },
        },
        reviewsReviewsListingTolistings: true,
      },
    });

    // Calculate the average rating and count of reviews for each listing
    const listingsWithRatingsAndReviewCount = await Promise.all(
      listings.map(async (listing) => {
        const { _avg, _count } = await PrismaClient.reviews.aggregate({
          _avg: {
            rating: true,
          },
          _count: {
            rating: true,
          },
          where: {
            listing: listing.id,
          },
        });

        const rating = _avg && _avg.rating ? Number(_avg.rating.toFixed(1)) : null;
        const reviewCount = _count && _count.rating;
        const { multiple } = listing;
        const images = listing.listingImages.map((image) => image.image);

        return {
          ...listing,
          images,
          rating,
          reviewCount,
          multiple,
        };
      })
    );

    const sortedListings = postSort(listingsWithRatingsAndReviewCount);

    // Format the listings
    const formattedListings = await Promise.all(
      sortedListings.map((listing) =>
        formatSingleListingResponse(listing, queryParams.includeParameters)
      )
    );

    res.status(200).json(formatAPIResponse({ totalCount, listings: formattedListings }));
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
        multiple: data.multiple,
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

    handleBookmarks(UpdateType.CREATE, listing);

    res.status(201).json(formatAPIResponse({ listingId: listing.id }));
  });
