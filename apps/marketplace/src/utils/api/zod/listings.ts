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
const type = z.nativeEnum(ListingType);
const images = z
  .array(
    z.object({
      id: z.string(),
      filename: z.string(),
      url: z.string(),
    })
  )
  .optional();
const coverImage = z.string().optional();
const active = z.boolean();
const owner = z.number();
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
  type,
  images,
  coverImage,
  active,
  owner,
  parameters,
});

// POST /listings
export const createListing = z.object({ listingId: id });

// POST /listings/:id/images
export const createListingImage = z.object({ imageId: z.string() });

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
export const getListingImages = z.array(images);

// GET /listings/:id/images/:imageId
export const getListingImage = z.object({
  fileName: z.string(),
  url: z.string(),
});

// GET /listings/:id/parameters
export const getListingParameters = parameters;

// PUT /listings/:id
export const updateListing = listing;

// PUT /listings/:id/images
export const updateListingImages = z.array(images);

// PUT /listings/:id/images/:imageId
export const updateListingImage = z.object({ 
  id: z.string(),
  filename: z.string(),
  url: z.string(),
})

// PUT /listings/:id/parameters
export const updateListingParameters = parameters;

// DELETE /listings/:id
export const deleteListing = z.object({});

// DELETE /listings/:id/images/:imageId
export const deleteListingImage = z.object({});