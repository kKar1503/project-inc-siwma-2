import { z } from 'zod';

// -- Define properties -- //
const id = z.string();
const name = z.string();
const chineseName = z.string();
const description = z.string();
const categoryId = z.string();
const unit = z.string();
const chineseUnit = z.string();

// -- Define listing schema -- //
const listingItem = z.object({
  id,
  name,
  chineseName,
  description,
  categoryId,
  unit,
  chineseUnit,
});

// Listing items have been changed to products however it is still lisitng-items in the db
// POST /products
const createListingItem = z.object({ listingItemId: id });

// GET /products
const getListingItems = z.array(listingItem);

// GET /products/:id
const getListingItem = listingItem;

// PUT /products/:id
const updateListingItem = listingItem;

// DELETE /products/:id
const deleteListingItem = z.object({});

export type ListingItemResponseBody = z.infer<typeof listingItem>;
export type ListingItem = z.infer<typeof listingItem>;

export default {
  create: createListingItem,
  getAll: getListingItems,
  getById: getListingItem,
  update: updateListingItem,
  delete: deleteListingItem,
};
