import { apiHandler, formatAPIResponse } from '@/utils/api';
import { z } from 'zod';
import PrismaClient, { CategoriesParameters } from '@inc/db';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { ParamError } from '@inc/errors';

export type queryResult = {
  id: number;
  name: string;
  description: string;
  image: string;
  crossSectionImage: string;
  categoriesParameters?: CategoriesParameters[];
};

export type parameter = {
  parameterId: string;
  required: boolean;
};

export type getResponse = {
  id: string;
  name: string;
  description: string;
  image: string;
  crossSectionImage: string;
  parameters?: parameter[];
};

export const getCategoriesQueryParameter = z.object({
  includeParameters: z.string().optional(),
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

export function formatParamters(parameters: CategoriesParameters[] | undefined): parameter[] {
  const temp: parameter[] = [];
  if (parameters) {
    parameters.forEach((p) => {
      temp.push({
        parameterId: p.parameterId.toString(),
        required: p.required,
      });
    });
  }
  return temp;
}

function formatResponse(response: queryResult[]): getResponse[] {
  const temp: getResponse[] = [];
  response.forEach((r) => {
    temp.push({
      id: r.id.toString(),
      name: r.name,
      description: r.description,
      image: r.image,
      crossSectionImage: r.crossSectionImage,
      parameters: r.categoriesParameters ? formatParamters(r.categoriesParameters) : undefined,
    });
  });
  return temp;
}

export default apiHandler()
  .get(async (req, res) => {
    const { includeParameters = 'false' } = getCategoriesQueryParameter.parse(req.query);
    const include = includeParameters === 'true';

    const response: queryResult[] = await PrismaClient.category.findMany({
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

    res.status(200).json(formatAPIResponse(formatResponse(response)));
  })
  .post(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const { name, description, image, crossSectionImage, parameters } = categoryRequestBody.parse(
      req.body
    );

    if (name != null && name.trim().length === 0) {
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

    res.status(201).json(formatAPIResponse({ categoryId: response.id.toString() }));
  });
