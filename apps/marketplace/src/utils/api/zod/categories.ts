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

export const createCategory = z.object({ categoryId });
export const getCategories = category.array();
export const getCategory = category;
export const updateCategory = category;
export const deleteCategory = z.object({});
