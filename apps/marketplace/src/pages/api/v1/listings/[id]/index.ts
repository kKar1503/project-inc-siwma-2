import { apiHandler, formatAPIResponse, zodParseToInteger, zodParseToNumber } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError, ForbiddenError, ParamError } from '@inc/errors';
import { ListingType } from '@prisma/client';
import z from 'zod';
import { formatSingleListingResponse, getQueryParameters, parseListingId } from '..';

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
        include: {
          companies: true,
        },
      },
      listingsParametersValues: true,
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

interface Parameter {
  paramId: number;
  value: number;
}

// Define the schema for the request body
const putListingRequestBody = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().gte(0).optional(),
  unitPrice: z.boolean().optional(),
  negotiable: z.boolean().optional(),
  categoryId: z.number().optional(),
  type: z.nativeEnum(ListingType).optional(),
  rating: z.number().optional(),
  reviewCount: z.number().optional(),
  parameters: z
    .array(
      z.object({
        paramId: z.string().transform(zodParseToInteger),
        value: z.string().transform(zodParseToNumber),
      })
    )
    .optional(),
});

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
    const queryParams = getQueryParameters.parse(req.query);

    // Retrieve the listing from the database
    const id = parseListingId(req.query.id as string);
    const listing = await checkListingExists(id);

    // Return the result
    res
      .status(200)
      .json(
        formatAPIResponse(await formatSingleListingResponse(listing, queryParams.includeParameters))
      );
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
      const parameterUpdates = data.parameters.map((parameter: Parameter) =>
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
        offersOffersListingTolistings: true,
      },
    });

    if (!completeListing) {
      throw new NotFoundError(`Listing with id '${id}'`);
    }

    res
      .status(200)
      .json(
        formatAPIResponse(
          await formatSingleListingResponse(completeListing, queryParams.includeParameters)
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
