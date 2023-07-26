import { z } from 'zod';

// -- Product properties -- //
const id = z.string();
const name = z.string();
const chineseName = z.string().nullable();
const unit = z.string();
const chineseUnit = z.string().nullable();
const description = z.string();

// -- Category Properties -- //
const category = z.object({
  id: z.string(),
  name: z.string(),
  crossSectionImage: z.string(),
});

// -- Product Schema -- //
export const productSchema = z.object({
  id,
  name,
  chineseName,
  unit,
  chineseUnit,
  description,
  category,
});

export const productsSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;
