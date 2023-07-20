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
