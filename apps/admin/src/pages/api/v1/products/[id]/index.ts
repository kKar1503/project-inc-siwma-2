import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import PrismaClient from '@inc/db';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { NotFoundError, ParamError } from '@inc/errors';
import { listingItemSchema } from '@/utils/api/server/zod';
import { formatSingleListingItemResponse, parseListingItemId } from '..';

export async function checkListingItemExists($id: string | number) {
  // Parse and validate listing id provided
  const id = typeof $id === 'number' ? $id : parseListingItemId($id);

  // Check if the listing exists
  const listingItem = await PrismaClient.listingItem.findFirst({
    where: {
      id,
    },
  });

  // Check if the listing exists
  if (!listingItem) {
    throw new NotFoundError(`Listing Item with id '${id}'`);
  }
  return listingItem;
}

function parseId(id: string | undefined): number {
  if (!id) {
    throw new ParamError('id');
  }
  return parseToNumber(id, 'id');
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
    // Retrieve the listing from the database
    const id = parseListingItemId(req.query.id as string, false);

    const listingItem = await checkListingItemExists(id);

    const completeListingItem = {
      ...listingItem,
    };

    // Return the result
    const response = await formatSingleListingItemResponse(completeListingItem);

    res.status(200).json(formatAPIResponse(response));
  })
  .put(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const id = parseListingItemId(req.query.id as string);

    // Validate the request body
    const data = listingItemSchema.put.body.parse(req.body);

    const categoryId = parseId(id as unknown as string);

    if (data.name != null && data.name.trim().length === 0) {
      throw new ParamError('name');
    }

    const category = await checkCategory(categoryId);
    if (!category) {
      throw new NotFoundError('Category');
    }

    await PrismaClient.listingItem.update({
      where: { id },
      data: {
        name: data.name,
        chineseName: data.chineseName,
        description: data.description,
        unit: data.unit,
        chineseUnit: data.chineseUnit,
        categoryId: data.categoryId,
      },
    });

    const completeListingItem = await PrismaClient.listingItem.findUnique({
      where: { id },
    });

    if (!completeListingItem) {
      throw new NotFoundError(`Listing with id '${id}'`);
    }

    res
      .status(200)
      .json(formatAPIResponse(await formatSingleListingItemResponse(completeListingItem)));
  })
  .delete(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const id = parseListingItemId(req.query.id as string);

    await PrismaClient.listingItem.delete({
      where: { id },
    });

    res.status(204).end();
  });
