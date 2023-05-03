import { apiHandler, formatAPIResponse } from '@/utils/api';
import { z } from 'zod';
import PrismaClient from '@inc/db';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { ParamError } from '@/errors';

export type getResponse = {
  id?: number;
  name: string;
  description: string;
  image: string;
  crossSectionImage: string;
  categoriesParameters?: {
    categoryId?: number;
    parameterId: number;
    required: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }[];
};

export const getCategoriesRequestBody = z.object({
  includeParameters: z.boolean().optional(),
});

export const categoryRequestBody = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  crossSectionImage: z.string(),
  parameters: z
    .object({
      parameterId: z.number(),
      required: z.boolean(),
    })
    .array(),
});

export default apiHandler()
  .get(async (req, res) => {
    const { includeParameters = false } = getCategoriesRequestBody.parse(req.body);

    const response: getResponse[] = await PrismaClient.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        crossSectionImage: true,
        createdAt: false,
        updatedAt: false,
        categoriesParameters: includeParameters,
      },
    });

    // delete unnecessary properties from paramters array
    /* eslint-disable no-param-reassign */
    response.forEach((r) => {
      if (r.categoriesParameters) {
        r.categoriesParameters.forEach((parameter) => {
          delete parameter.categoryId;
          delete parameter.createdAt;
          delete parameter.updatedAt;
        });
      }
    });
    res.status(200).json(formatAPIResponse(response));
  })
  .post(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const { name, description, image, crossSectionImage, parameters } = categoryRequestBody.parse(
      req.body
    );

    if (name === '') {
      throw new ParamError('name');
    }

    const response = await PrismaClient.category.create({
      data: {
        name,
        description,
        image,
        crossSectionImage,
        categoriesParameters: {
          create: parameters,
        },
      },
    });

    res.status(201).json(formatAPIResponse({ categoryId: response.id }));
  });
