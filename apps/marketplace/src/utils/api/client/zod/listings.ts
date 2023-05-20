import { ListingType } from '@prisma/client';
import { z } from 'zod';

// -- Define properties -- //
const id = z.string();
const name = z.string();
const description = z.string();
const price = z.number();
const unitPrice = z.boolean().optional();
const negotiable = z.boolean().optional();
const categoryId = z.string();
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
const createdAt = z.string();

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
  company,
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
  createdAt,
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
const createListing = z.object({ listingId: id });

// POST /listings/:id/images
const createListingImage = z.object({ imageId: z.string() });

// POST /listings/:id/parameters
const createListingParameter = parameter;

// POST /listings/:id/review
const createListingReview = review;

// GET /listings
const getListings = z.array(listing);

// GET /listings/:id
const getListing = listing;

// GET /listings/:id/images
const getListingImages = z.array(images);

// GET /listings/:id/images/:imageId
const getListingImage = z.object({
  fileName: z.string(),
  url: z.string(),
});

// GET /listings/:id/parameters
const getListingParameters = z.array(parameter);

// GET /listings/:id/reviews
const getListingReviews = z.array(review);

// PUT /listings/:id
const updateListing = listing;

// PUT /listings/:id/images
const updateListingImages = z.array(images);

// PUT /listings/:id/images/:imageId
const updateListingImage = z.object({
  id: z.string(),
  filename: z.string(),
  url: z.string(),
});

// PUT /listings/:id/parameters
const updateListingParameters = z.array(parameter);

// DELETE /listings/:id
const deleteListing = z.object({});

// DELETE /listings/:id/images/:imageId
const deleteListingImage = z.object({});

export default {
  create: createListing,
  createImage: createListingImage,
  createParameter: createListingParameter,
  createReview: createListingReview,
  getAll: getListings,
  getById: getListing,
  getImages: getListingImages,
  getImage: getListingImage,
  getParameters: getListingParameters,
  getReviews: getListingReviews,
  update: updateListing,
  updateImages: updateListingImages,
  updateImage: updateListingImage,
  updateParameters: updateListingParameters,
  delete: deleteListing,
  deleteImage: deleteListingImage,
};
