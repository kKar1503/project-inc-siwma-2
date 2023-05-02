import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import PrismaClient, { Listing, ListingType } from '@inc/db';
import { z } from 'zod';
import { Decimal } from '@prisma/client/runtime';
import { NotFoundError } from '@/errors';

// -- Type definitions -- //
export type ListingResponse = {
  id: string;
  name: string;
  description: string;
  price: Decimal;
  unitPrice?: boolean;
  negotiable?: boolean;
  categoryId: string;
  type: ListingType;
  active: boolean;
  owner: string;
  parameters?: Array<{
    paramId: string;
    value: string;
  }>;
};

export type ListingWithParameters = Listing & {
  listingsParametersValue: Array<{
    parameterId: number;
    value: string;
  }>;
};

// -- Helper functions -- //
export function formatListingResponse($listings: ListingWithParameters[]) {
  return $listings.map((listing) => ({
    id: listing.id.toString(),
    name: listing.name,
    description: listing.description,
    price: listing.price,
    unitPrice: listing.unitPrice,
    negotiable: listing.negotiable,
    categoryId: listing.categoryId.toString(),
    listingType: listing.type,
    owner: listing.owner,
    active: listing.active,
    parameters: listing.listingsParametersValue
      ? listing.listingsParametersValue.map((parameter) => ({
        paramId: parameter.parameterId.toString(),
        value: parameter.value,
      }))
      : undefined,
  }));
}

export function formatSingleListingResponse(listing: ListingWithParameters): ListingResponse {
  return {
    id: listing.id.toString(),
    name: listing.name,
    description: listing.description,
    price: listing.price,
    unitPrice: listing.unitPrice,
    negotiable: listing.negotiable,
    categoryId: listing.categoryId.toString(),
    type: listing.type,
    owner: listing.owner,
    active: listing.active,
    parameters: listing.listingsParametersValue
      ? listing.listingsParametersValue.map((parameter) => ({
        paramId: parameter.parameterId.toString(),
        value: parameter.value,
      }))
      : undefined,
  };
}

export const listingsRequestBody = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  unitPrice: z.boolean().optional(),
  negotiable: z.boolean().optional(),
  categoryId: z.number(),
  type: z.nativeEnum(ListingType),
  parameters: z
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
    // Retrieve all listings from the database
    const listings = await PrismaClient.listing.findMany({
      include: {
        listingsParametersValues: true,
      },
    });

    res.status(200).json(formatAPIResponse(formatListingResponse(listings)));
  })
  .post(async (req, res) => {

    const data = listingsRequestBody.parse(req.body);

    // Use the user ID from the request object
    const userId = req.token?.user?.id;

    // Check if the category exists
    const categoryExists = await PrismaClient.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!categoryExists) {
      throw new NotFoundError('Category');
    }

    const listing = await PrismaClient.listing.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        unitPrice: data.unitPrice,
        negotiable: data.negotiable,
        categoryId: data.categoryId,
        type: data.type,
        active: true,
        owner: userId,
        listingsParametersValues: data.parameters
          ? {
            create: data.parameters.map((parameter) => ({
              value: parameter.value,
              parameter: {
                connect: {
                  id: parseToNumber(parameter.paramId),
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

    res.status(201).json({ listingId: listing.id });

  });
