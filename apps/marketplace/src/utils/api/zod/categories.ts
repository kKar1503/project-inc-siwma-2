import { z } from 'zod';

const categoryId = z.number();
const name = z.string();
const description = z.string();
const image = z.string().url();
const crossSectionImage = z.string().url();
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
  parameters: parameters.array(),
});

export const createCategory = z.object({ categoryId });
export const getCategories = category.array();
export const getCategory = category;
export const updateCategory = category;
export const deleteCategory = z.object({});

