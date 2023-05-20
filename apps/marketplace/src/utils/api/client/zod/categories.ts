import { z } from 'zod';

const categoryId = z.number();
const name = z.string();
const description = z.string();
const image = z.string().url();
const crossSectionImage = z.string().url();
const active = z.boolean();
const parameterId = z.number();
const required = z.boolean();

const parameters = z.object({
  parameterId,
  required,
});

const category = z.object({
  name,
  description,
  image,
  crossSectionImage,
  active,
  parameters: parameters.array().optional(),
});

const createCategory = z.object({ categoryId });
const getCategories = category.array();
const getCategory = category;
const updateCategory = category;
const deleteCategory = z.object({});

export default {
  create: createCategory,
  getAll: getCategories,
  getById: getCategory,
  update: updateCategory,
  delete: deleteCategory,
};
