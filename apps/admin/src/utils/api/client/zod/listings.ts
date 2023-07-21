import { ListingType } from '@inc/db-enums';
import { z } from 'zod';

// -- Define properties -- //
const id = z.string();
const name = z.string();
const description = z.string();
const price = z.number();
const unit = z.string();
const quantity = z.number();
const negotiable = z.boolean();
const categoryId = z.string();
const type = z.nativeEnum(ListingType);
const createdAt = z.string();

const company = z.object({
  id: z.string(),
  name: z.string(),
  website: z.string().nullable(),
  bio: z.string().nullable(),
  image: z.string().nullable(),
  visible: z.boolean(),
});

const owner = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  company,
  profilePic: z.string().nullable(),
  mobileNumber: z.string(),
  contactMethod: z.string(),
  bio: z.string().nullable(),
});

const parameter = z.object({
  paramId: z.string(),
  value: z.string(),
});

const open = z.boolean();

const purchased = z.boolean();

// -- Define listing schema -- //
const listing = z.object({
  id,
  name,
  description,
  price,
  unit,
  quantity,
  negotiable,
  categoryId,
  type,
  owner,
  open,
  parameters: z.array(parameter).optional(),
  createdAt,
  purchased,
});

// POST /listings
const createListing = z.object({ listingId: id });

// POST /listings/:id/images
const createListingImage = z.object({ imageId: z.string() });

// POST /listings/:id/parameters
const createListingParameter = parameter;

// GET /listings
const getListings = z.array(listing);

// GET /listings/:id
const getListing = listing;

// GET /listings/:id/parameters
const getListingParameters = z.array(parameter);

// PUT /listings/:id
const updateListing = listing;

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

export type ListingParameter = z.infer<typeof parameter>;
export type ListingResponseBody = z.infer<typeof listing>;
export type Listing = z.infer<typeof listing>;

export default {
  create: createListing,
  createImage: createListingImage,
  createParameter: createListingParameter,
  getAll: getListings,
  getById: getListing,
  getParameters: getListingParameters,
  update: updateListing,
  updateImage: updateListingImage,
  updateParameters: updateListingParameters,
  delete: deleteListing,
  deleteImage: deleteListingImage,
};
