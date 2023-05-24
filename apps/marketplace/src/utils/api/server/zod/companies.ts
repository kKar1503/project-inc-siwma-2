import { z } from 'zod';
import { zodParseToNumber } from '../../apiHelper';

const createCompanyRequestBody = z.object({
  name: z.string(),
  website: z.string(),
  comments: z.string(),
  image: z.string().optional(),
});

const getCompaniesQueryParams = z.object({
  lastIdPointer: z.string().transform(zodParseToNumber).optional(),
  limit: z.string().transform(zodParseToNumber).optional(),
  name: z.string().optional(),
});

const editCompanyRequestBody = z.object({
  name: z.string().optional(),
  website: z.string().optional(),
  bio: z.string().optional(),
  comments: z.string().optional(),
  image: z.string().optional(),
});

export type PostCompanyRequestBody = z.infer<typeof createCompanyRequestBody>;
export type GetCompaniesQueryParameter = z.infer<typeof getCompaniesQueryParams>;
export type PutCompanyRequestBody = z.infer<typeof editCompanyRequestBody>;

export default {
  post: {
    body: createCompanyRequestBody,
  },
  get: {
    query: getCompaniesQueryParams,
  },
  put: {
    body: editCompanyRequestBody,
  },
};
