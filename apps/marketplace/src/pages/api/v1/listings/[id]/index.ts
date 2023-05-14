import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError, ForbiddenError } from '@inc/errors';
import { formatSingleListingResponse, getQueryParameters, parseListingId } from '..';
import z from 'zod';
import { ListingType } from '@prisma/client';

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

interface Parameter {
  paramId: string;
  value: string;
}

// Define the schema for the request body
const putListingRequestBody = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  unitPrice: z.boolean().optional(),
  negotiable: z.boolean().optional(),
  categoryId: z.number(),
  type: z.nativeEnum(ListingType),
  listingsParametersValues: z
    .array(
      z.object({
        paramId: z.string(),
        value: z.string(),
      })
    )
    .optional(),
});

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
    const data = putListingRequestBody.parse(req.body);

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
      const parameterUpdates = data.listingsParametersValues.map((parameter: Parameter) => {
        return PrismaClient.listingsParametersValue.upsert({
          where: {
            listingId_parameterId: {
              parameterId: parseToNumber(parameter.paramId, 'paramId'),
              listingId: id,
            },
          },
          update: { value: parameter.value },
          create: {
            value: parameter.value,
            parameterId: parseToNumber(parameter.paramId, 'paramId'),
            listingId: id,
          },
        });
      });

      await PrismaClient.$transaction(parameterUpdates);
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

    if (!completeListing) {
      throw new NotFoundError(`Listing with id '${id}'`);
    }

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
    const userId = req.token?.user?.id;
    const userRole = req.token?.user?.permissions;

    const listing = await checkListingExists(id);

    const isOwner = listing.owner === userId;
    const isAdmin = userRole && userRole >= 1;
    const sameCompany = req.token?.user?.company === listing.users.companyId.toString();

    if (!isOwner && !isAdmin && !sameCompany) {
      throw new ForbiddenError();
    }

    await PrismaClient.listing.delete({
      where: { id },
    });

    res.status(204).end();
  });
