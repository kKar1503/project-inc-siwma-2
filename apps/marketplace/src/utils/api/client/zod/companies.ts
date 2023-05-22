import { z } from 'zod';

const createCompany = z.object({
  companyId: z.string(),
});

const getCompany = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string().nullable(),
  website: z.string().nullable(),
  image: z.string().nullable(),
  visible: z.boolean(),
  comments: z.string().nullable(),
  createdAt: z.date(),
});

const getCompanies = getCompany.array();

const editCompany = getCompany;

const toggleCompany = z.object({
  visible: z.boolean(),
});

const deleteCompany = z.object({});

export type CompanyResponseBody = z.infer<typeof getCompany>;

export default {
  create: createCompany,
  getById: getCompany,
  getAll: getCompanies,
  update: editCompany,
  toggle: toggleCompany,
  delete: deleteCompany,
};
