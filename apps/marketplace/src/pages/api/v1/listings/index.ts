import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient, {
  Listing,
  ListingImages,
  ListingType,
  ListingsParametersValue,
} from '@inc/db';
import { z } from 'zod';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { Decimal } from '@prisma/client/runtime';

// -- Type definitions -- //
// Define the type of the image object
type Image = {
  id: string;
  fileName: string;
  url: string;
};

// Define the type of the parameter object
type Parameter = {
  id: string;
  paramId: string;
  value: number;
};

// Define the type of the response object
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
};

// -- Helper functions -- //

export function formatListingResponse($listings: Listing | Listing[]) {
  // Initialise the listings array
  let listings = $listings;

  // Check if the listing is not an array
  if (!Array.isArray(listings)) {
    // Make it an array
    listings = [listings];
  }

  // Construct the result
  const result = listings.map((listing) => ({
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
  }));

  return formatAPIResponse(result);
}

export const listingsRequestBody = z.object({
  // Define the request body schema
  name: z.string(),
  description: z.string(),
  price: z.number(),
  unitPrice: z.boolean().optional(),
  negotiable: z.boolean().optional(),
  categoryId: z.number(),
  type: z.nativeEnum(ListingType),
  owner: z.string(),
  active: z.boolean(),
});

export default apiHandler()
  .get(apiGuardMiddleware(), async (req, res) => {
    // Retrieve all listings from the database
    const listings = await PrismaClient.listing.findMany();

    // Return the result
    res.status(200).json(formatListingResponse(listings));
  })
  .post(
    apiGuardMiddleware({
      allowAdminsOnly: true,
    }),
    async (req, res) => {
      // Create a new listing (admins only)
      // Parse and validate the request body
      const data = listingsRequestBody.parse(req.body);

      // Insert the listing into the database
      // Add the necessary fields based on the request body schema
      const result = await PrismaClient.listing.create({
        data: {
          // Add the necessary fields based on the request body schema
        },
      });

      // Return the result
      res.status(201).json({ listingId: result.id });
    }
  );
