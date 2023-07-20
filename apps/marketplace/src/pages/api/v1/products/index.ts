import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { productSchema } from '@/utils/api/server/zod';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';

export default apiHandler()
  .get(async (req, res) => {
    // Parse the query parameters
    const queryParams = productSchema.get.query.parse(req.query);

    // Retrieve filtered and sorted listings from the database
    const products = await PrismaClient.listingItem.findMany({
      where: {
        name: queryParams.matching
          ? {
              contains: queryParams.matching,
              mode: 'insensitive',
            }
          : undefined,
      },
      skip: queryParams.lastIdPointer,
      take: queryParams.limit,
    });

    res.status(200).json(formatAPIResponse({ products }));
  })
  .post(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const body = productSchema.post.body.parse(req.body);

    const product = await PrismaClient.listingItem.create({
      data: {
        name: body.name,
        chineseName: body.chineseName,
        description: body.description,
        unit: body.unit,
        chineseUnit: body.chineseUnit,
        categoryId: body.categoryId,
      },
    });

    res.status(200).json(formatAPIResponse({ product }));
  })
  .put(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const body = productSchema.put.body.parse(req.body);

    const product = await PrismaClient.listingItem.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        chineseName: body.chineseName,
        description: body.description,
        unit: body.unit,
        chineseUnit: body.chineseUnit,
        categoryId: body.categoryId,
      },
    });

    res.status(200).json(formatAPIResponse({ product }));
  })
  .delete(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const params = productSchema.delete.parameters.parse(req.query);

    await PrismaClient.listingItem.delete({
      where: {
        id: params.id,
      },
    });

    res.status(204).end();
  });
