import { NotFoundError, ParamError, ForbiddenError } from '@inc/errors';
import { apiHandler, parseToNumber, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { z } from 'zod';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';

const editCompanyRequestBody = z.object({
  name: z.string().optional(),
  website: z.string().optional(),
  bio: z.string().optional(),
  comments: z.string().optional(),
  image: z.string().optional(),
});

function parseCompanyId(id: string | undefined): number {
  if (!id) {
    throw new ParamError('id');
  }
  return parseToNumber(id);
}

export default apiHandler()
  .get(async (req, res) => {
    const isAdmin = req.token?.user.permissions === 1;
    const { id } = req.query;

    const response = await PrismaClient.companies.findUnique({
      where: {
        id: parseCompanyId(id as string),
      },
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
    });

    // if the company does not exist
    if (!response) {
      throw new NotFoundError('Company');
    }

    return res.status(200).json(formatAPIResponse(response));
  })
  .put(async (req, res) => {
    const { id } = req.query;
    const { name, website, bio, comments, image } = editCompanyRequestBody.parse(req.body);

    const companyid = parseCompanyId(id as string);
    const isAdmin = req.token?.user.permissions === 1;
    const user = await PrismaClient.users.findUnique({
      where: {
        id: req.token?.user.id,
      },
    });

    if (!isAdmin && user?.companyId !== companyid) {
      throw new ForbiddenError();
    }

    if (name === '') {
      throw new ParamError('name');
    }

    const websiteRegex =
      /(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g;

    if (website && !websiteRegex.test(website)) {
      throw new ParamError('website');
    }

    // update the company
    const response = await PrismaClient.companies.update({
      where: {
        id: companyid,
      },
      data: {
        name,
        website,
        bio,
        logo: image,
        companiesComments: {
          update: {
            comments,
          },
        },
      },
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
    });

    // if company doesn't exist
    if (!response) {
      throw new NotFoundError('Company');
    }

    res.status(200).json(formatAPIResponse(response));
  })
  .delete(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const { id } = req.query;

    const data = await PrismaClient.companies.delete({
      where: {
        id: parseCompanyId(id as string),
      },
    });

    // if the company does not exist
    if (!data) {
      throw new NotFoundError('Company');
    }

    return res.status(204).end();
  });
