import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import PrismaClient, { Companies, Listing, ListingType, Prisma, UserContacts, Users } from '@inc/db';
import { NotFoundError, ParamError } from '@inc/errors';
import { listingSchema } from '@/utils/api/server/zod';
import { ListingResponseBody } from '@/utils/api/client/zod';
import { fileToS3Object, getFilesFromRequest } from '@/utils/imageUtils';
import process from 'process';
import s3Connection from '@/utils/s3Connection';
import { Decimal } from '@prisma/client/runtime';
import { z } from 'zod';
import { zodParseToBoolean, zodParseToInteger, zodParseToNumber } from '@/utils/api/apiHelper';

export const ListingBucketName = process.env.AWS_LISTING_BUCKET_NAME as string;

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
export type OwnerResponse = {
  id: string;
  name: string;
  email: string;
  company: {
    id: string;
    name: string;
    website: string | null;
    bio: string | null;
    image: string | null;
    visible: boolean;
  };
  profilePic: string | null;
  mobileNumber: string;
  contactMethod: UserContacts;
  bio: string | null;
};

export type ListingResponse = {
  id: string;
  name: string;
  description: string;
  price: Decimal;
  unitPrice?: boolean;
  negotiable?: boolean;
  categoryId: string;
  type: ListingType;
  owner: OwnerResponse;
  open: boolean;
  parameters?: Array<{
    paramId: string;
    value: string;
  }>;
  images?: Array<{
    image: string;
  }>;
  createdAt: Date;
};

export type ListingWithParameters = Listing & {
  listingsParametersValues: Array<{
    parameterId: number;
    value: string;
  }>;
  offersOffersListingTolistings: Array<{
    accepted: boolean;
  }>;
  listingImages: Array<{
    id: number;
    filename: string;
    image: string;
  }>;
  users: Users & {
    companies: Companies;
  };
  rating: number | null;
  reviewCount: number;
};

export const getQueryParameters = z.object({
  lastIdPointer: z.string().transform(zodParseToInteger).optional(),
  limit: z.string().transform(zodParseToInteger).optional(),
  matching: z.string().optional(),
  includeParameters: z.string().transform(zodParseToBoolean).optional().default('false'),
  includeImages: z.string().transform(zodParseToBoolean).optional().default('false'),
  params: z.string().optional(),
  category: z.string().transform(zodParseToInteger).optional(),
  negotiable: z.string().transform(zodParseToBoolean).optional(),
  minPrice: z.string().transform(zodParseToNumber).optional(),
  maxPrice: z.string().transform(zodParseToNumber).optional(),
  sortBy: z.string().optional(),
});

// -- Helper functions -- //
export async function formatSingleListingResponse(
  listing: ListingWithParameters,
  includeParameters: boolean,
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
    open: !listing.offersOffersListingTolistings?.some((offer) => offer.accepted),
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

  if (listing.listingImages) {
    const bucket = await s3Connection.getBucket(ListingBucketName);
    formattedListing.images = await Promise.all(listing.listingImages.map(async (image) => ({
      id: image.id.toString(),
      filename: image.filename,
      url: await bucket.getObjectUrl(image.image),
    })));
  }


  return formattedListing;
}

export async function formatListingResponse(
  $listings: ListingWithParameters[],
  includeParameters: boolean,
) {
  return Promise.all(
    $listings.map((listing) => formatSingleListingResponse(listing, includeParameters)),
  );
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
      }),
    )
    .optional(),
});

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
        listingImages: queryParams.includeImages,
        offersOffersListingTolistings: true,
        users: {
          include: {
            companies: true,
          },
        },
      },
    });


    let listingsWithRatingsAndReviewCount = await Promise.all(
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

        return {
          ...listing,
          rating,
          reviewCount,
        };
      }),
    );

    // Sort listings by rating, if needed
    if (queryParams.sortBy) {
      switch (queryParams.sortBy.toLowerCase()) {
        case 'highest_rating':
          listingsWithRatingsAndReviewCount.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
          break;
        case 'lowest_rating':
          listingsWithRatingsAndReviewCount.sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));
          break;
        default:
          break;
      }
    }

    const bucket = await s3Connection.getBucket(ListingBucketName);

    listingsWithRatingsAndReviewCount = await Promise.all(
      listingsWithRatingsAndReviewCount.map(async (listing) => ({
        ...listing,
        images: listing.listingImages ? await Promise.all(listing.listingImages.map(async (image) => ({
          image: await bucket.getObjectUrl(image.image),
        }))) : undefined,
      })),
    );

    // Format the listings
    const formattedListings = await Promise.all(
      listingsWithRatingsAndReviewCount.map((listing) =>
        formatSingleListingResponse(listing, queryParams.includeParameters),
      ),
    );

    res.status(200).json(formatAPIResponse(formattedListings));
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


    const files = await getFilesFromRequest(req);
    const bucket = await s3Connection.getBucket(ListingBucketName);
    const objects = await Promise.all(files.map((file) => bucket.createObject(fileToS3Object(file))));


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
        listingImages: {
          create: await Promise.all(objects.map(async (object) => ({
            image: await object.generateLink(),
          }))),
        },
      },
      include: {
        listingsParametersValues: true,
      },
    });

    res.status(201).json(formatAPIResponse({ listingId: listing.id }));
  });
