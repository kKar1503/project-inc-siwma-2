import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { z } from 'zod';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { ParamError } from '@inc/errors';

const createCompanyRequestBody = z.object({
  name: z.string(),
  website: z.string(),
  comments: z.string().optional(),
  image: z.string().optional(),
});

const getCompaniesRequestBody = z.object({
  lastIdPointer: z.number().optional(),
  limit: z.number().optional(),
  name: z.string().optional(),
});

export default apiHandler()
  .post(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const { name, website, comments, image } = createCompanyRequestBody.parse(req.body);

    if (name === '') {
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
      },
    });

    // if company was created and comments are provided
    if (response && comments) {
      const companyid = response.id;
      const response2 = await PrismaClient.companiesComments.create({
        data: {
          companyId: companyid,
          comments,
        },
      });
    }

    res.status(201).json(formatAPIResponse({ companyId: response.id }));
  })
  .get(async (req, res) => {
    const isAdmin = req.token?.user.permissions === 1;

    const { lastIdPointer, limit, name } = getCompaniesRequestBody.parse(req.body);

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
          gt: lastIdPointer,
        },
        name: {
          contains: name,
        },
      },
      take: limit,
    });

    res.status(200).json(formatAPIResponse(response));
  });
