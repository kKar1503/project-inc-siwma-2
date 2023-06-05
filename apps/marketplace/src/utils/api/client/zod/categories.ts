import { z } from 'zod';

const categoryId = z.string();
const name = z.string();
const description = z.string();
const image = z.string().url();
const crossSectionImage = z.string().url();
const active = z.boolean();
const parameterId = z.string();
const required = z.boolean();

const parameter = z.object({
  parameterId,
  required,
});

const category = z.object({
  id: categoryId,
  name,
  description,
  image,
  crossSectionImage,
  active,
  parameters: parameter.array().optional(),
});

const createCategory = z.object({ categoryId });
const getCategories = category.array();
const getCategory = category;
const updateCategory = category;
const deleteCategory = z.object({});

export type CategoryResponseBody = z.infer<typeof getCategory>;
export type Category = z.infer<typeof getCategory>;
export type CatgeoryParameter = z.infer<typeof parameter>;

export default {
  create: createCategory,
  getAll: getCategories,
  getById: getCategory,
  update: updateCategory,
  delete: deleteCategory,
};
