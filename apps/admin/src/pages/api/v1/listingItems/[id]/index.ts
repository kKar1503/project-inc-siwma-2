import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { ForbiddenError, NotFoundError } from '@inc/errors';
import { listingItemSchema } from '@/utils/api/server/zod';
import { formatSingleListingItemResponse, parseListingItemId } from '..';

// -- Functions --//
/**
 * Checks if a listing exists
 * @returns The listing item if it exists
 * @param $id
 */
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
  .put(async (req, res) => {
    const id = parseListingItemId(req.query.id as string);
    const userRole = req.token?.user?.permissions;

    const listingItem = await checkListingItemExists(id);

    const isAdmin = userRole && userRole >= 1;

    if (!isAdmin) {
      throw new ForbiddenError();
    }

    // Validate the request body
    const data = listingItemSchema.put.body.parse(req.body);

    if (data.categoryId) {
      // Remove old parameters if the category has changed
      if (data.categoryId !== listingItem.categoryId) {
        await PrismaClient.listingsParametersValue.deleteMany({
          where: {
            listingId: id,
          },
        });
      }
    }

    // Do not remove this, it is necessary to update the listing item
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
  .delete(async (req, res) => {
    const id = parseListingItemId(req.query.id as string);

    const userRole = req.token?.user?.permissions;

    const isAdmin = userRole && userRole >= 1;

    if (!isAdmin) {
      throw new ForbiddenError();
    }

    // Delete listing item from db
    await PrismaClient.listingItem.delete({
      where: { id },
    });

    // Return 204 no content
    res.status(204).end();
  });
