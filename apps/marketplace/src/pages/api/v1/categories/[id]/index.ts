import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { z } from 'zod';
import PrismaClient from '@inc/db';
import { NotFoundError, ParamError } from '@/errors';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { getCategoriesRequestBody, getResponse } from '../index';

const editCategoryRequestBody = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  crossSectionImage: z.string().optional(),
  parameters: z
    .object({
      parameterId: z.number(),
      required: z.boolean(),
    })
    .array()
    .optional(),
});

function parseId(id: string | undefined): number {
  if (id) {
    return parseToNumber(id);
  }
  return 0;
}

export default apiHandler()
  .get(async (req, res) => {
    const { id } = req.query;
    const { includeParameters = false } = getCategoriesRequestBody.parse(req.body);

    const response: getResponse | null = await PrismaClient.category.findFirst({
      where: {
        id: parseId(id as string),
      },
      select: {
        name: true,
        description: true,
        image: true,
        crossSectionImage: true,
        createdAt: false,
        updatedAt: false,
        categoriesParameters: includeParameters,
      },
    });

    if (!response) {
      throw new NotFoundError('Category');
    }

    // delete unnecessary properties from paramters array
    /* eslint-disable no-param-reassign */
    if (response.categoriesParameters) {
      response.categoriesParameters.forEach((parameter) => {
        delete parameter.categoryId;
        delete parameter.createdAt;
        delete parameter.updatedAt;
      });
    }

    res.status(200).json(formatAPIResponse(response));
  })
  .put(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const { id } = req.query;

    const { name, description, image, crossSectionImage, parameters } =
      editCategoryRequestBody.parse(req.body);

    if (name === '') {
      throw new ParamError('name');
    }

    if (parameters) {
      parameters.forEach(async (parameter) => {
        const response2 = await PrismaClient.categoriesParameters.update({
          where: {
            categoryId_parameterId: {
              categoryId: parseId(id as string),
              parameterId: parameter.parameterId,
            },
          },
          data: {
            parameterId: parameter.parameterId,
            required: parameter.required,
          },
        });
      });
    }

    const response = await PrismaClient.category.update({
      where: {
        id: parseId(id as string),
      },
      data: {
        name,
        description,
        image,
        crossSectionImage,
      },
      select: {
        name: true,
        description: true,
        image: true,
        crossSectionImage: true,
        createdAt: false,
        updatedAt: false,
        categoriesParameters: {
          select: {
            parameterId: true,
            required: true,
            createdAt: false,
            updatedAt: false,
          },
        },
      },
    });

    if (!response) {
      throw new NotFoundError('Category');
    }

    res.status(200).json(formatAPIResponse(response));
  })
  .delete(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const { id } = req.query;

    const response = await PrismaClient.category.delete({
      where: {
        id: parseId(id as string),
      },
    });

    if (!response) {
      throw new NotFoundError('Category');
    }

    res.status(204).end();
  });
