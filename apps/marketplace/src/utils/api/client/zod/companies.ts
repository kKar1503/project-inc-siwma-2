import { z } from 'zod';

const createCompany = z.object({
  companyId: z.string(),
});

const getCompany = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string(),
  website: z.string(),
  image: z.string(),
  visible: z.boolean(),
  comments: z.string().optional(),
  createdAt: z.date().optional(),
});

const getCompanies = getCompany.array();

const editCompany = getCompany;

const toggleCompany = z.object({
  visible: z.boolean(),
});

const deleteCompany = z.object({});

export default {
  create: createCompany,
  getById: getCompany,
  getAll: getCompanies,
  update: editCompany,
  toggle: toggleCompany,
  delete: deleteCompany,
};
