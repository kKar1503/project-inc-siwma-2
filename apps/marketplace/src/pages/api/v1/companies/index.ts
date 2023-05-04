import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import PrismaClient, { CompaniesComments } from '@inc/db';
import { z } from 'zod';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { ParamError } from '@inc/errors';

const createCompanyRequestBody = z.object({
  name: z.string(),
  website: z.string(),
  comments: z.string(),
  image: z.string().optional(),
});

const getCompaniesRequestBody = z.object({
  lastIdPointer: z.string().optional(),
  limit: z.string().optional(),
  name: z.string().optional(),
});

export type queryResult = {
  id: number;
  name: string;
  website: string | null;
  bio: string | null;
  logo: string | null;
  visibility: boolean;
  companiesComments?: CompaniesComments | null;
  createdAt?: Date;
};

export type getResponseBody = {
  id: string;
  name: string;
  website: string | null;
  bio: string | null;
  image: string | null;
  visible: boolean;
  comments?: string | null;
  createdAt?: Date;
};

function formatResponse(response: queryResult[]): getResponseBody[] {
  const temp: getResponseBody[] = [];
  response.forEach((r) => {
    temp.push({
      id: r.id.toString(),
      name: r.name,
      website: r.website,
      bio: r.bio,
      image: r.logo,
      visible: r.visibility,
      comments: r.companiesComments?.comments,
      createdAt: r.createdAt,
    });
  });
  return temp;
}

export default apiHandler()
  .post(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const { name, website, comments, image } = createCompanyRequestBody.parse(req.body);

    if (!name || name.trim().length === 0) {
      throw new ParamError('name');
    }

    const websiteRegex =
      /(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g;

    if (website && !websiteRegex.test(website)) {
      throw new ParamError('website');
    }

    const response = await PrismaClient.companies.create({
      data: {
        name,
        website,
        logo: image,
        companiesComments: {
          create: {
            comments,
          },
        },
      },
    });

    res.status(201).json(formatAPIResponse({ companyId: response.id.toString() }));
  })
  .get(async (req, res) => {
    const isAdmin = req.token?.user.permissions === 1;

    const { lastIdPointer = '0', limit = '10', name } = getCompaniesRequestBody.parse(req.query);

    const response = await PrismaClient.companies.findMany({
      select: {
        id: true,
        name: true,
        bio: true,
        website: true,
        logo: true,
        visibility: true,
        createdAt: isAdmin,
        companiesComments: isAdmin,
      },
      where: {
        id: {
          gt: parseToNumber(lastIdPointer),
        },
        name: {
          contains: name,
        },
      },
      take: parseToNumber(limit),
    });

    res.status(200).json(formatAPIResponse(formatResponse(response)));
  });
