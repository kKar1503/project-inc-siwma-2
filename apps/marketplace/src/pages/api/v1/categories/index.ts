import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import PrismaClient from '@inc/db';

export const getCategoriesRequestBody = z.object({
  includeParameters: z.boolean().optional(),
});

const createCategoryRequestBody = z.object({
  name: z.string(),
  parameters: z
    .object({
      parameterId: z.string(),
      required: z.boolean(),
    })
    .array(),
});

export default apiHandler({ allowNonAuthenticated: false })
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { includeParameters = false } = getCategoriesRequestBody.parse(req.body);

    const response = await PrismaClient.categoriesParameters.findMany({
      include: {
        category: true,
        parameter: includeParameters,
      },
    });

    res.status(200).json(formatAPIResponse(response));
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, parameters } = createCategoryRequestBody.parse(req.body);
    const response = await PrismaClient.category.create({
      data: {
        name,
      },
    });
  });
