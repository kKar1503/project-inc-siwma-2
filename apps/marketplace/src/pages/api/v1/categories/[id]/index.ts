import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { z } from 'zod';
import PrismaClient from '@inc/db';
import { NotFoundError, ParamError } from '@inc/errors';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { getCategoriesQueryParameter, getResponse, queryResult, formatParamters } from '../index';

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
  if (!id) {
    throw new ParamError('id');
  }
  return parseToNumber(id);
}

function formatResponse(response: queryResult): getResponse {
  return {
    id: response.id.toString(),
    name: response.name,
    description: response.description,
    image: response.image,
    crossSectionImage: response.crossSectionImage,
    parameters: response.categoriesParameters
      ? formatParamters(response.categoriesParameters)
      : undefined,
  };
}

export default apiHandler()
  .get(async (req, res) => {
    const { id } = req.query;
    const { includeParameters = 'false' } = getCategoriesQueryParameter.parse(req.query);
    const include = includeParameters === 'true';

    const response: queryResult | null = await PrismaClient.category.findFirst({
      where: {
        id: parseId(id as string),
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        crossSectionImage: true,
        createdAt: false,
        updatedAt: false,
        categoriesParameters: include,
      },
    });

    if (!response) {
      throw new NotFoundError('Category');
    }

    res.status(200).json(formatAPIResponse(formatResponse(response)));
  })
  .put(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const { id } = req.query;

    const { name, description, image, crossSectionImage, parameters } =
      editCategoryRequestBody.parse(req.body);

    if (name != null && name.trim().length === 0) {
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
        id: true,
        name: true,
        description: true,
        image: true,
        crossSectionImage: true,
        createdAt: false,
        updatedAt: false,
        categoriesParameters: true,
      },
    });

    if (!response) {
      throw new NotFoundError('Category');
    }

    res.status(200).json(formatAPIResponse(formatResponse(response)));
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
