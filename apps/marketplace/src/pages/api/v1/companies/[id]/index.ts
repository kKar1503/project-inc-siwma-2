import { NotFoundError, ParamError, ForbiddenError } from '@inc/errors';
import { apiHandler, parseToNumber, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { z } from 'zod';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { getResponseBody, queryResult } from '..';

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

async function checkCompany(companyid: number) {
  const company = await PrismaClient.companies.findFirst({
    where: {
      id: companyid,
    },
  });
  return company;
}

function formatResponse(r: queryResult): getResponseBody {
  return {
    id: r.id.toString(),
    name: r.name,
    website: r.website,
    bio: r.bio,
    image: r.logo,
    visible: r.visibility,
    comments: r.comments,
    createdAt: r.createdAt,
  };
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
        comments: isAdmin,
      },
    });

    // if the company does not exist
    if (!response) {
      throw new NotFoundError('Company');
    }

    return res.status(200).json(formatAPIResponse(formatResponse(response)));
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

    if (!name || name.trim().length === 0) {
      throw new ParamError('name');
    }

    const websiteRegex =
      /(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g;

    if (website && !websiteRegex.test(website)) {
      throw new ParamError('website');
    }

    const company = await checkCompany(companyid);
    // check if company exists
    if (!company) {
      throw new NotFoundError('Company');
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
        comments,
      },
      select: {
        id: true,
        name: true,
        bio: true,
        website: true,
        logo: true,
        visibility: true,
        createdAt: isAdmin,
        comments: isAdmin,
      },
    });

    if (!response) {
      throw new NotFoundError('Company');
    }

    res.status(200).json(formatAPIResponse(formatResponse(response)));
  })
  .delete(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const { id } = req.query;
    const companyid = parseCompanyId(id as string);

    // check if company exists
    const company = await checkCompany(companyid);
    if (!company) {
      throw new NotFoundError('Company');
    }

    const response = await PrismaClient.companies.delete({
      where: {
        id: companyid,
      },
    });

    return res.status(204).end();
  });
