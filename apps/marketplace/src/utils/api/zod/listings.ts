import { ListingType } from '@prisma/client';
import { z } from 'zod';

// -- Define properties -- //
const id = z.number();
const name = z.string();
const description = z.string();
const price = z.number();
const unitPrice = z.boolean().optional();
const negotiable = z.boolean().optional();
const categoryId = z.number();
const typeId = z.nativeEnum(ListingType);
const active = z.boolean();
const ownerId = z.number();
const parameters = z
  .array(
    z.object({
      paramId: z.string(),
      value: z.string(),
    })
  )
  .optional();

// -- Define schema -- //
const listing = z.object({
  id,
  name,
  description,
  price,
  unitPrice,
  negotiable,
  categoryId,
  typeId,
  active,
  ownerId,
  parameters,
});

// POST /listings
export const createListing = z.object({ listingId: id });

// POST /listings/:id/images

// POST /listings/:id/parameters
export const createListingParameter = z.object({
  success: z.boolean(),
  data: z.literal('Listing parameter created successfully'),
});

// GET /listings
export const getListings = z.array(listing);

// GET /listings/:id
export const getListing = listing;

// GET /listings/:id/images

// GET /listings/:id/images/:imageId

// GET /listings/:id/parameters
export const getListingParameters = parameters;

// PUT /listings/:id
export const updateListing = listing;

// PUT /listings/:id/images

// PUT /listings/:id/images/:imageId

// PUT /listings/:id/parameters
export const updateListingParameters = parameters;

// DELETE /listings/:id
export const deleteListing = z.object({});

// DELETE /listings/:id/images/:imageId
