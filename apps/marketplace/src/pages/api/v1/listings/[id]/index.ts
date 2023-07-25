import { MeiliSearch } from 'meilisearch';
import { apiHandler, formatAPIResponse, handleBookmarks, UpdateType } from '@/utils/api';
import PrismaClient from '@inc/db';
import { ForbiddenError, NotFoundError, ParamError, ParamInvalidError } from '@inc/errors';
import { listingSchema } from '@/utils/api/server/zod';
import type { ListingParameter } from '@inc/types';
import type { TMeilisearchListing, TMeilisearchListingParameter } from '@/types/listing';
import { formatSingleListingResponse, parseListingId } from '..';

// -- Functions --//
/**
 * Checks if a listing exists
 * @returns The listing if it exists
 * @param $id
 * @param requireImages
 */
export async function checkListingExists($id: string | number) {
  // Parse and validate listing id provided
  const id = typeof $id === 'number' ? $id : parseListingId($id);

  // Check if the listing exists
  const listing = await PrismaClient.listing.findFirst({
    where: {
      id,
      deletedAt: null,
    },
    include: {
      listingItem: true,
      users: {
        include: {
          companies: true,
        },
      },
      listingsParametersValue: true,
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
    },
  });

  // Check if the listing exists
  if (!listing) {
    throw new NotFoundError(`Listing with id '${id}'`);
  }
  return listing;
}

async function getValidParametersForCategory(listingItemId: number): Promise<string[]> {
  // Fetch valid parameters for the category
  const validParameters = await PrismaClient.listingItem.findUnique({
    where: { id: listingItemId },
    select: {
      category: {
        select: {
          categoriesParameters: true,
        },
      },
    },
  });

  if (!validParameters) {
    throw new NotFoundError(`Listing item with id '${listingItemId}'`);
  }

  // Return an array of valid parameter ids
  return validParameters.category.categoriesParameters.map((param) => param.parameterId.toString());
}

export default apiHandler()
  .get(async (req, res) => {
    const queryParams = listingSchema.get.query.parse(req.query);

    // Obtain the user's id
    const userId = req.token?.user?.id;

    // Retrieve the listing from the database
    const id = parseListingId(req.query.id as string, false);

    const listing = await checkListingExists(id);

    const completeListing = {
      ...listing,
    };
    // Return the result

    const response = await formatSingleListingResponse(completeListing, userId, {
      ...queryParams,
    });

    res.status(200).json(formatAPIResponse(response));
  })
  .put(async (req, res) => {
    const client = new MeiliSearch({
      host: process.env.MEILI_URL as string,
      apiKey: process.env.MEILI_MASTER_KEY as string,
    });

    const queryParams = listingSchema.get.query.parse(req.query);
    const id = parseListingId(req.query.id as string);
    const userId = req.token?.user?.id;
    const userRole = req.token?.user?.permissions;

    const listing = await checkListingExists(id);

    const isOwner = listing.owner === userId;
    const isAdmin = userRole && userRole >= 1;
    const sameCompany = req.token?.user?.companyId === listing.users.companyId.toString();

    if (!isOwner && !isAdmin && !sameCompany) {
      throw new ForbiddenError();
    }

    // Validate the request body
    const data = listingSchema.put.body.parse(req.body);

    if (data.productId) {
      // Check if the listing item exists
      const listingItem = await PrismaClient.listingItem.findUnique({
        where: { id: data.productId },
      });

      if (!listingItem) {
        throw new ParamError(`listingItemId`);
      }

      // Remove old parameters if the listingItemId has changed
      if (data.productId !== listing.listingItemId) {
        await PrismaClient.listingsParametersValue.deleteMany({
          where: {
            listingId: id,
          },
        });
      }
    }

    // Get valid parameters for the listing's category
    const validParameters = await getValidParametersForCategory(
      data.productId || listing.listingItemId
    );

    // Check that each paramId is a valid parameter for the category
    if (data.parameters) {
      data.parameters.forEach((parameter) => {
        if (!validParameters.includes(parameter.paramId.toString())) {
          throw new ParamInvalidError('paramId', parameter.paramId);
        }
      });
    }

    // Do not remove this, it is necessary to update the listing
    const updatedListing = await PrismaClient.listing.update({
      where: { id },
      data: {
        listingItemId: data.productId,
        quantity: data.quantity,
        price: data.price,
        negotiable: data.negotiable,
        type: data.type,
      },
      include: {
        users: {
          include: {
            companies: true,
          },
        },
        listingsParametersValue: true,
        offers: true,
      },
    });

    // Construct the new parameter value object
    const oldParams = updatedListing.listingsParametersValue?.parameters as ListingParameter[];
    const parameterValues = oldParams.map((parameter) => {
      const newParam = data.parameters?.find((param) => param.paramId === parameter.parameterId);
      const result = newParam
        ? { parameterId: newParam.paramId, value: newParam.value.toString() }
        : parameter;
      return result;
    });

    // Update the listing's parameters
    if (parameterValues) {
      await PrismaClient.listingsParametersValue.upsert({
        where: {
          listingId: id,
        },
        update: {
          parameters: parameterValues,
        },
        create: {
          listingId: id,
          parameters: parameterValues,
        },
      });
    }

    // ** Listing after update
    // TODO: do this thingy
    const completeListing = await PrismaClient.listing.findUnique({
      where: { id },
      include: {
        users: {
          include: {
            companies: true,
          },
        },
        listingItem: true,
        listingsParametersValue: true,
        offers: true,
      },
    });

    if (!completeListing) {
      throw new NotFoundError(`Listing with id '${id}'`);
    }

    const parameters: Array<TMeilisearchListingParameter> = [];

    (
      completeListing.listingsParametersValue?.parameters as Array<{
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

    await client.index<TMeilisearchListing>('listings').updateDocuments([
      {
        id: listing.id,
        name: completeListing.listingItem.name,
        chineseName: completeListing.listingItem.chineseName,
        description: completeListing.listingItem.description,
        price: listing.price.toNumber(),
        parameters,
      },
    ]);

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

    const wasListingOpen = Number(listing.quantity) > 0;

    const isListingOpen = Number(listing.quantity) > 0;

    if (wasListingOpen && !isListingOpen) {
      handleBookmarks(UpdateType.SOLD_OUT, listing);
    } else if (!wasListingOpen && isListingOpen) {
      handleBookmarks(UpdateType.RESTOCKED, listing);
    }

    res.status(200).json(
      formatAPIResponse(
        await formatSingleListingResponse(completeListing, userId, {
          ...queryParams,
        })
      )
    );
  })
  .delete(async (req, res) => {
    const client = new MeiliSearch({
      host: process.env.MEILI_URL as string,
      apiKey: process.env.MEILI_MASTER_KEY as string,
    });

    const id = parseListingId(req.query.id as string);
    const userId = req.token?.user?.id;
    const userRole = req.token?.user?.permissions;

    const listing = await checkListingExists(id);

    const isOwner = listing.owner === userId;
    const isAdmin = userRole && userRole >= 1;
    const sameCompany = req.token?.user?.companyId === listing.users.companyId.toString();

    if (!isOwner && !isAdmin && !sameCompany) {
      throw new ForbiddenError();
    }

    await PrismaClient.listing.update({
      where: { id },
      data: {
        deletedAt: new Date().toISOString(),
      },
    });

    // ** Delete listing from meilisearch index using id
    await client.index<TMeilisearchListing>('listings').deleteDocument(id.toString());

    handleBookmarks(UpdateType.DELETE, listing);

    res.status(204).end();
  });
