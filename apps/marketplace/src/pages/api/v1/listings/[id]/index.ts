import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError, ForbiddenError } from '@inc/errors';
import { formatSingleListingResponse, getQueryParameters } from '..';
import { parseListingId } from '../index';

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
  const listing = await PrismaClient.listing.findUnique({
    where: { id },
    include: {
      users: {
        select: {
          companyId: true,
        },
      },
      listingsParametersValues: true,
    },
  });

  // Check if the listing exists
  if (!listing) {
    throw new NotFoundError(`Listing with id '${id}'`);
  }

  return listing;
}

interface ParameterValue {
  paramId: string;
  value: string;
}

export default apiHandler()
  .get(async (req, res) => {
    const queryParams = getQueryParameters.parse(req.query);

    // Retrieve the listing from the database
    const id = parseListingId(req.query.id as string);
    const listing = await checkListingExists(id);

    // Return the result
    res
      .status(200)
      .json(formatAPIResponse(formatSingleListingResponse(listing, queryParams.includeParameters)));
  })
  .put(async (req, res) => {
    const queryParams = getQueryParameters.parse(req.query);

    const id = parseListingId(req.query.id as string);
    const userPermissions = req.token?.user?.permissions;

    if (!userPermissions || userPermissions < 1) {
      throw new ForbiddenError();
    }

    const listing = await checkListingExists(id);

    // Update the listing with the request data
    const data = req.body;

    //Do not remove this, it is necessary to update the listing
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
      },
      include: {
        users: {
          select: {
            companyId: true,
          },
        },
        listingsParametersValues: true,
      },
    });

    if (data.listingsParametersValues) {
      for (const parameter of data.listingsParametersValues) {
        await PrismaClient.listingsParametersValue.upsert({
          where: {
            listingId_parameterId: {
              parameterId: parseInt(parameter.paramId),
              listingId: id,
            },
          },
          update: { value: parameter.value },
          create: {
            value: parameter.value,
            parameterId: parseInt(parameter.paramId),
            listingId: id,
          },
        });
      }
    }

    const completeListing = await PrismaClient.listing.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            companyId: true,
          },
        },
        listingsParametersValues: true,
      },
    });

    res
      .status(200)
      .json(
        formatAPIResponse(
          formatSingleListingResponse(completeListing, queryParams.includeParameters)
        )
      );
  })
  .delete(async (req, res) => {
    const id = parseListingId(req.query.id as string);
    const userPermissions = req.token?.user?.permissions;

    if (!userPermissions || userPermissions < 1) {
      throw new ForbiddenError();
    }

    await PrismaClient.listing.delete({
      where: { id },
    });

    res.status(204).end();
  });
