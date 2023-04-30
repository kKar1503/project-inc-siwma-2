import { NotFoundError } from '@/errors';
import { apiHandler, parseToNumber } from '@/utils/api';
import PrismaClient from '@inc/db';
import { z } from 'zod';

const PUTSchema = z.object({
  name: z.string(),
  website: z.string(),
  bio: z.string(),
  comments: z.string(),
  image: z.string(),
});

function parseCompanyId(companyid: any): number {
  if (companyid && typeof companyid === 'string') {
    return parseToNumber(companyid);
  }
  return 0;
}

export default apiHandler({
  allowNonAuthenticated: true,
})
  .get(async (req, res) => {
    const { id } = req.query;

    const data = await PrismaClient.companies.findUnique({
      where: {
        id: parseCompanyId(id),
      },
    });
    if (!data) {
      throw new NotFoundError('company');
    }

    return res.status(200).json({ data });
  })
  .put(async (req, res) => {
    const { id } = req.query;
    const { name, website, bio, comments, image } = PUTSchema.parse(req.body);

    const data = await PrismaClient.companies.update({
      where: {
        id: parseCompanyId(id),
      },
      data: {
        name,
        website,
        bio,
        logo: image,
      },
    });

    if (comments) {
      const comment = await PrismaClient.companiesComments.update({
        where: {
          companyId: parseCompanyId(id),
        },
        data: {
          comments,
        },
      });
    }

    if (!data) {
      throw new NotFoundError('company');
    }

    res.status(200).json({ data });
  })
  .delete(async (req, res) => {
    const { id } = req.query;

    const data = await PrismaClient.companies.delete({
      where: {
        id: parseCompanyId(id),
      },
    });
    if (!data) {
      throw new NotFoundError('company');
    }

    return res.status(204).end();
  });
