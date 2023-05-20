import { z } from 'zod';

export const createCompany = z.object({
  companyId: z.string(),
});

export const getCompany = z.object({
  id: z.string().transform((val) => Number(val)),
  name: z.string(),
  bio: z.string(),
  website: z.string(),
  image: z.string(),
  visible: z.boolean(),
  comments: z.string().optional(),
  createdAt: z.date().optional(),
});

export const getCompanies = getCompany.array();

export const editCompany = getCompany;

export const toggleCompany = z.object({
  visible: z.boolean(),
});

export const deleteCompany = z.object({});
