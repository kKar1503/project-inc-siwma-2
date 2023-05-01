import { NotFoundError, ParamError } from '@/errors';
import { apiHandler, parseToNumber, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { z } from 'zod';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';

const editCompanyRequestBody = z.object({
  name: z.string(),
  website: z.string(),
  bio: z.string(),
  comments: z.string().optional(),
  image: z.string(),
});

function parseCompanyId(id: any): number {
  if (id && typeof id === 'string') {
    return parseToNumber(id);
  }
  return 0;
}

export default apiHandler({})
  .get(async (req, res) => {
    const isAdmin = req.token?.user.permissions === 1;
    const { id } = req.query;

    const response = await PrismaClient.companies.findUnique({
      where: {
        id: parseCompanyId(id),
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
      throw new NotFoundError('company');
    }

    return res.status(200).json(formatAPIResponse(response));
  })
  .put(async (req, res) => {
    const isAdmin = req.token?.user.permissions === 1;
    const { id } = req.query;
    const { name, website, bio, comments, image } = editCompanyRequestBody.parse(req.body);

    // update the company
    const response = await PrismaClient.companies.update({
      where: {
        id: parseCompanyId(id),
      },
      data: {
        name,
        website,
        bio,
        logo: image,
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
      throw new NotFoundError('company');
    }

    // if comments are provided
    if (comments) {
      // see if the comments exist
      const commentsData = await PrismaClient.companiesComments.findFirst({
        where: {
          companyId: parseCompanyId(id),
        },
      });
      // if exist update
      if (commentsData) {
        const response2 = await PrismaClient.companiesComments.update({
          where: {
            id: commentsData.id,
          },
          data: {
            comments,
          },
        });
      }
      // otherwise create comments
      else {
        const response2 = await PrismaClient.companiesComments.create({
          data: {
            companyId: parseCompanyId(id),
            comments,
          },
        });
      }
    }

    res.status(200).json(formatAPIResponse(response));
  })
  .delete(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const { id } = req.query;

    const data = await PrismaClient.companies.delete({
      where: {
        id: parseCompanyId(id),
      },
    });

    // if the company does not exist
    if (!data) {
      throw new NotFoundError('company');
    }

    return res.status(204).end();
  });
