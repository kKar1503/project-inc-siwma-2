import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient, { CategoriesParameters } from '@inc/db';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { ParamError } from '@inc/errors';
import categories from '@/utils/api/server/zod/categories';

export type queryResult = {
  id: number;
  name: string;
  description: string;
  image: string;
  crossSectionImage: string;
  active: boolean;
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
  active?: boolean;
  parameters?: parameter[];
};

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
      active: r.active,
      parameters: r.categoriesParameters ? formatParamters(r.categoriesParameters) : undefined,
    });
  });
  return temp;
}

export default apiHandler()
  .get(async (req, res) => {
    const { includeParameters = 'false' } = categories.get.query.parse(req.query);
    const include = includeParameters === 'true';

    const response: queryResult[] = await PrismaClient.category.findMany({
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

    res.status(200).json(formatAPIResponse(formatResponse(response)));
  })
  .post(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const { name, description, image, crossSectionImage, parameters } = categories.post.body.parse(
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
