import { z } from 'zod';

// -- Define properties -- //
const id = z.string();
const name = z.string();
const chineseName = z.string().nullable();
const description = z.string();
const categoryId = z.string();
const unit = z.string();
const chineseUnit = z.string().nullable();

// -- Define listing schema -- //
const product = z.object({
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
const createProduct = z.object({ productId: id });

// GET /products
const getProducts = z.array(product);

// GET /products/:id
const getProduct = product;

// PUT /products/:id
const updateProduct = product;

// DELETE /products/:id
const deleteProduct = z.object({});

export type ProductResponseBody = z.infer<typeof product>;
export type Product = z.infer<typeof product>;

export default {
  create: createProduct,
  getAll: getProducts,
  getById: getProduct,
  update: updateProduct,
  delete: deleteProduct,
};
