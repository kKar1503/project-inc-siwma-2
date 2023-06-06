import { apiHandler, handleBookmarks, formatAPIResponse, UpdateType } from '@/utils/api';
import PrismaClient from '@inc/db';
import { ForbiddenError, NotFoundError, ParamError } from '@inc/errors';
import s3Connection from '@/utils/s3Connection';
import { listingSchema } from '@/utils/api/server/zod';
import { formatSingleListingResponse, parseListingId } from '..';


const ListingBucketName = process.env.LISTING_BUCKET_NAME as string;
// -- Functions --//
/**
 * Checks if a listing exists
 * @param id The listing id
 * @returns The listing if it exists
 */
export async function checkListingExists($id: string | number) {
  // Parse and validate listing id provided
  const id = typeof $id === 'number' ? $id : parseListingId($id);

  // Check if the listing exists
  const listing = await PrismaClient.listing.findFirst({
    where: {
      id,
    },
    include: {
      users: {
        include: {
          companies: true,
        },
      },
      listingsParametersValues: true,
      listingImages: true,
      offersOffersListingTolistings: true,
      reviewsReviewsListingTolistings: true,
    },
  });

  // Check if the listing exists
  if (!listing) {
    throw new NotFoundError(`Listing with id '${id}'`);
  }
  return listing;
}

async function getValidParametersForCategory(categoryId: number): Promise<string[]> {
  // Fetch valid parameters for the category
  const validParameters = await PrismaClient.category.findUnique({
    where: { id: categoryId },
    include: { categoriesParameters: true },
  });

  if (!validParameters) {
    throw new NotFoundError(`Category with id '${categoryId}'`);
  }

  // Return an array of valid parameter ids
  return validParameters.categoriesParameters.map((param) => param.parameterId.toString());
}

export default apiHandler()
  .get(async (req, res) => {
    const queryParams = listingSchema.get.query.parse(req.query);

    // Retrieve the listing from the database
    const id = parseListingId(req.query.id as string, false);
    const { _avg, _count } = await PrismaClient.reviews.aggregate({
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
      where: {
        listing: id,
      }
    });

    const rating = _avg && _avg.rating ? Number(_avg.rating.toFixed(1)) : null;
    const reviewCount = _count && _count.rating;

    const listing = await checkListingExists(id);

    const completeListing = {
      ...listing,
      rating,
      reviewCount,
      multiple: listing.multiple,
    };
    // Return the result

    const response = await formatSingleListingResponse(
      completeListing,
      queryParams.includeParameters
    );

    res.status(200).json(formatAPIResponse(response));
  })
  .put(async (req, res) => {
    const queryParams = listingSchema.get.query.parse(req.query);
    const id = parseListingId(req.query.id as string);
    const userId = req.token?.user?.id;
    const userRole = req.token?.user?.permissions;

    const listing = await checkListingExists(id);

    const isOwner = listing.owner === userId;
    const isAdmin = userRole && userRole >= 1;
    const sameCompany = req.token?.user?.company === listing.users.companyId.toString();

    if (!isOwner && !isAdmin && !sameCompany) {
      throw new ForbiddenError();
    }

    // Validate the request body
    const data = listingSchema.put.body.parse(req.body);

    if (data.categoryId) {
      // Get valid parameters for the listing's category
      const validParameters = await getValidParametersForCategory(data.categoryId);

      // Check that each paramId is a valid parameter for the category
      if (data.parameters) {
        data.parameters.forEach((parameter) => {
          if (!validParameters.includes(parameter.paramId.toString())) {
            throw new ParamError('paramId');
          }
        });
      }
    }

    // Do not remove this, it is necessary to update the listing
    const updatedListing = await PrismaClient.listing.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        unitPrice: data.unitPrice,
        negotiable: data.negotiable,
        categoryId: data.categoryId,
        type: data.type,
        multiple: data.multiple,
      },
      include: {
        users: {
          include: {
            companies: true,
          },
        },
        listingsParametersValues: true,
        offersOffersListingTolistings: true,
      },
    });

    if (data.parameters) {
      const parameterUpdates = data.parameters.map((parameter) =>
        PrismaClient.listingsParametersValue.upsert({
          where: {
            listingId_parameterId: {
              parameterId: parameter.paramId,
              listingId: id,
            },
          },
          update: { value: parameter.value.toString() },
          create: {
            value: parameter.value.toString(),
            parameterId: parameter.paramId,
            listingId: id,
          },
        })
      );

      await PrismaClient.$transaction(parameterUpdates);
    }

    const completeListing = await PrismaClient.listing.findUnique({
      where: { id },
      include: {
        users: {
          include: {
            companies: true,
          },
        },
        listingsParametersValues: true,
        listingImages: queryParams.includeImages,
        offersOffersListingTolistings: true,
        reviewsReviewsListingTolistings: true,
      },
    });

    if (!completeListing) {
      throw new NotFoundError(`Listing with id '${id}'`);
    }

    const { _avg, _count } = await PrismaClient.reviews.aggregate({
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
      where: {
        listing: id,
      },
    });

    const rating = _avg && _avg.rating ? Number(_avg.rating.toFixed(1)) : null;
    const reviewCount = _count && _count.rating;

    const listingWithRatingAndReviewCount = {
      ...completeListing,
      rating,
      reviewCount,
      multiOffer: completeListing.multiple,
    };

    // MARK: - Notifications

    /* Notify when:
     * Listing price is updated
     * Listing is sold out
     */
    if (data.price) {
      const formattedPrice = listing.price.toNumber();
      if (formattedPrice > data.price) {
        handleBookmarks(UpdateType.PRICE_INCREASE, listing);
      } else if (formattedPrice < data.price) {
        handleBookmarks(UpdateType.PRICE_DECREASE, listing);
      }
    }

    const wasListingOpen = listing.multiple
      ? true
      : !listing.offersOffersListingTolistings?.some((offer) => offer.accepted);

    const isListingOpen = updatedListing.multiple
      ? true
      : !updatedListing.offersOffersListingTolistings?.some((offer) => offer.accepted);

    if (wasListingOpen && !isListingOpen) {
      handleBookmarks(UpdateType.SOLD_OUT, listing);
    } else if (!wasListingOpen && isListingOpen) {
      handleBookmarks(UpdateType.RESTOCKED, listing);
    }

    res
      .status(200)
      .json(
        formatAPIResponse(
          await formatSingleListingResponse(
            listingWithRatingAndReviewCount,
            queryParams.includeParameters
          )
        )
      );
  })
  .delete(async (req, res) => {
    const id = parseListingId(req.query.id as string);
    const userId = req.token?.user?.id;
    const userRole = req.token?.user?.permissions;

    const listing = await checkListingExists(id);

    const isOwner = listing.owner === userId;
    const isAdmin = userRole && userRole >= 1;
    const sameCompany = req.token?.user?.company === listing.users.companyId.toString();

    if (!isOwner && !isAdmin && !sameCompany) {
      throw new ForbiddenError();
    }
    const bucket = await s3Connection.getBucket(ListingBucketName);
    await Promise.all(listing.listingImages.map(async (image) => bucket.deleteObject(image.image)));

    await PrismaClient.listing.delete({
      where: { id },
    });

    handleBookmarks(UpdateType.DELETE, listing);

    res.status(204).end();
  });
