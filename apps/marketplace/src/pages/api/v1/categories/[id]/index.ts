import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError, ParamError } from '@inc/errors';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import categories from '@/utils/api/server/zod/categories';
import { getResponse, queryResult, formatParamters } from '../index';

function parseId(id: string | undefined): number {
  if (!id) {
    throw new ParamError('id');
  }
  return parseToNumber(id, 'id');
}

function formatResponse(response: queryResult): getResponse {
  return {
    id: response.id.toString(),
    name: response.name,
    description: response.description,
    image: response.image,
    crossSectionImage: response.crossSectionImage,
    active: response.active,
    parameters: response.categoriesParameters
      ? formatParamters(response.categoriesParameters)
      : undefined,
  };
}

async function checkCategory(categoryId: number) {
  const category = await PrismaClient.category.findFirst({
    where: {
      id: categoryId,
    },
  });
  return category;
}

export default apiHandler()
  .get(async (req, res) => {
    const { id } = req.query;
    const { includeParameters = 'false' } = categories.get.query.parse(req.query);
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
        active: true,
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

    const { name, description, image, crossSectionImage, parameters } = categories.put.body.parse(
      req.body
    );

    const categoryId = parseId(id as string);

    if (name != null && name.trim().length === 0) {
      throw new ParamError('name');
    }

    const category = await checkCategory(categoryId);
    if (!category) {
      throw new NotFoundError('Category');
    }

    if (parameters) {
      parameters.forEach(async (parameter) => {
        await PrismaClient.categoriesParameters.update({
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
        id: categoryId,
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
        active: true,
        createdAt: false,
        updatedAt: false,
        categoriesParameters: true,
      },
    });

    res.status(200).json(formatAPIResponse(formatResponse(response)));
  })
  .delete(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const { id } = req.query;

    const categoryId = parseId(id as string);

    const category = await checkCategory(categoryId);
    if (!category) {
      throw new NotFoundError('Category');
    }

    await PrismaClient.category.delete({
      where: {
        id: categoryId,
      },
    });

    res.status(204).end();
  });
