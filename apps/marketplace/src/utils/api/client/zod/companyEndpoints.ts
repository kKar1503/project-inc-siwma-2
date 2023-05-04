import { z } from 'zod';

export const getCompanyResponseBody = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string(),
  website: z.string(),
  logo: z.string(),
  visible: z.boolean(),
  createdAt: z.date().optional(),
  comments: z.string().optional(),
});

export const getCompaniesResponseBody = getCompanyResponseBody.array();

export const createCompanyResponseBody = z.object({
  companyId: z.number(),
});

export const editCompanyResponseBody = getCompanyResponseBody;

export const enableCompanyResponseBody = z.object({
  visible: z.boolean(),
});
