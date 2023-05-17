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

const company = z.object({
  id: z.string(),
  name: z.string(),
  website: z.string().optional(),
  bio: z.string().optional(),
  image: z.string().optional(),
  visible: z.boolean().optional(),
});

const owner = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  company: company,
  profilePic: z.string().optional(),
  mobileNumber: z.string(),
  contactMethod: z.string(),
  bio: z.string().optional(),
});

const parameter = z
  .object({
    paramId: z.string(),
    value: z.string(),
  })
  .optional();

const active = z.boolean();

// -- Define listing schema -- //
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
  owner,
  active,
  parameters: z.array(parameter),
});

// -- Define review schema -- //
const review = z.object({
  id: z.string(),
  review: z.string(),
  rating: z.number(),
  userId: z.string(),
  listingId: z.string(),
  createdAt: z.string(),
});

// POST /listings
export const createListing = z.object({ listingId: id });

// POST /listings/:id/images
export const createListingImage = z.object({ imageId: z.string() });

// POST /listings/:id/parameters
export const createListingParameter = parameter;

// POST /listings/:id/review
export const createListingReview = review;

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
export const getListingParameters = z.array(parameter);

// GET /listings/:id/reviews
export const getListingReviews = z.array(review);

// PUT /listings/:id
export const updateListing = listing;

// PUT /listings/:id/images
export const updateListingImages = z.array(images);

// PUT /listings/:id/images/:imageId
export const updateListingImage = z.object({
  id: z.string(),
  filename: z.string(),
  url: z.string(),
});

// PUT /listings/:id/parameters
export const updateListingParameters = z.array(parameter);

// DELETE /listings/:id
export const deleteListing = z.object({});

// DELETE /listings/:id/images/:imageId
export const deleteListingImage = z.object({});
