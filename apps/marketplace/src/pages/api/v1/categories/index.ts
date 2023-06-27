import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import PrismaClient, { CategoriesParameters } from '@inc/db';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { ParamError } from '@inc/errors';
import { categorySchema } from '@/utils/api/server/zod';
import { CategoryResponseBody, CatgeoryParameter } from '@/utils/api/client/zod';

export type QueryResult = {
  id: number;
  name: string;
  description: string;
  image: string;
  crossSectionImage: string;
  active: boolean;
  categoriesParameters?: CategoriesParameters[];
};

export function parseCategoryId($id: string, strict = true) {
  // Check if strict mode is set
  if (strict) {
    // Attempt to parse the category id
    return parseToNumber($id, 'id');
  }

  // Attempt to retrieve the category id and name from the url
  const id = $id.split('-').pop() || '';

  // Parse and validate category id provided
  return parseToNumber(id, 'id');
}

export function formatParamters(
  parameters: CategoriesParameters[] | undefined
): CatgeoryParameter[] {
  const temp: CatgeoryParameter[] = [];
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

function formatResponse(response: QueryResult[]): CategoryResponseBody[] {
  const temp: CategoryResponseBody[] = [];
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
    const { includeParameters = 'false' } = categorySchema.get.query.parse(req.query);
    const include = includeParameters === 'true';

    const response: QueryResult[] = await PrismaClient.category.findMany({
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
    const { name, description, image, crossSectionImage, parameters } =
      categorySchema.post.body.parse(req.body);

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
