import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@/errors';

const getCategoryRequestBody = z.object({
  includeParameters: z.boolean().optional(),
});

function parseId(id: any): number {
  if (id && typeof id === 'string') {
    return parseToNumber(id);
  }
  return 0;
}

export default apiHandler()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { includeParameters } = getCategoryRequestBody.parse(req.body);

    const response = await PrismaClient.category.findFirst({
      where: {
        id: parseId(id),
      },
      include: {
        categoriesParameters: includeParameters,
      },
    });

    if (!response) {
      throw new NotFoundError('category');
    }

    res.status(200).json(formatAPIResponse(response));
  })
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
  })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    const response = await PrismaClient.category.delete({
      where: {
        id: parseId(id),
      },
    });

    if (!response) {
      throw new NotFoundError('category');
    }

    res.status(204).end();
  });
