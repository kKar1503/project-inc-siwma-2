import { apiHandler, formatAPIResponse, parseArray, parseToNumber } from '@/utils/api';
import PrismaClient from '@inc/db';
import type { Product } from '@/utils/api/server/zod/products';

export default apiHandler().get(async (req, res) => {
  // Obtain  query parameters
  const $ids = req.query.id;

  // Initialise query params
  const ids: number[] =
    $ids !== undefined ? parseArray($ids).map((e) => parseToNumber(e, 'id')) : [];

  if (ids.length === 0) {
    // Return empty result since empty ids
    res.status(200).json(formatAPIResponse([]));
    return;
  }

  // Retrieve all parameters from the database
  const products = await PrismaClient.listingItem.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    select: {
      id: true,
      name: true,
      chineseName: true,
      unit: true,
      chineseUnit: true,
      description: true,
      category: {
        select: {
          id: true,
          name: true,
          crossSectionImage: true,
        },
      },
    },
  });

  const formattedProducts: Product[] = products.map((p) => {
    const { id, category, ...rest } = p;
    const { id: catId, ...restCat } = category;

    return {
      ...rest,
      id: id.toString(),
      category: {
        ...restCat,
        id: catId.toString(),
      },
    };
  });

  // Return the result
  res.status(200).json(formatAPIResponse(formattedProducts));
});
