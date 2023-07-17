import { z } from 'zod';

// -- Define properties -- //
const id = z.string();
const name = z.string();
const chineseName = z.string();
const description = z.string();
const categoryId = z.number();
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

// POST /listingItems
const createListingItem = z.object({ listingItemId: id });

// GET /listingItems
const getListingItems = z.array(listingItem);

// GET /listingItems/:id
const getListingItem = listingItem;

// PUT /listingItems/:id
const updateListingItem = listingItem;

// DELETE /listingItems/:id
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
