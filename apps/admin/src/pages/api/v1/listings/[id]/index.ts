import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { ForbiddenError, NotFoundError, ParamError, ParamInvalidError } from '@inc/errors';
import { listingSchema } from '@/utils/api/server/zod';
import type { ListingParameter } from '@inc/types';
import { formatSingleListingResponse, parseListingId } from '..';

// -- Functions --//
/**
 * Checks if a listing exists
 * @returns The listing if it exists
 * @param $id
 * @param requireImages
 */
export async function checkListingExists($id: string | number) {
  // Parse and validate listing id provided
  const id = typeof $id === 'number' ? $id : parseListingId($id);

  // Check if the listing exists
  const listing = await PrismaClient.listing.findFirst({
    where: {
      id,
      deletedAt: null,
    },
    include: {
      listingItem: true,
      users: {
        include: {
          companies: true,
        },
      },
      listingsParametersValue: true,
      offers: {
        select: {
          accepted: true,
          messages: {
            select: {
              author: true,
            },
          },
        },
      },
    },
  });

  // Check if the listing exists
  if (!listing) {
    throw new NotFoundError(`Listing with id '${id}'`);
  }
  return listing;
}

export default apiHandler()
  .get(async (req, res) => {
    const queryParams = listingSchema.get.query.parse(req.query);

    // Obtain the user's id
    const userId = req.token?.user?.id;

    // Retrieve the listing from the database
    const id = parseListingId(req.query.id as string, false);

    const listing = await checkListingExists(id);

    const completeListing = {
      ...listing,
    };
    // Return the result

    const response = await formatSingleListingResponse(
      completeListing,
      userId,
      queryParams.includeParameters
    );

    res.status(200).json(formatAPIResponse(response));
  })
  .delete(async (req, res) => {
    const id = parseListingId(req.query.id as string);
    const userId = req.token?.user?.id;
    const userRole = req.token?.user?.permissions;

    const listing = await checkListingExists(id);

    const isOwner = listing.owner === userId;
    const isAdmin = userRole && userRole >= 1;
    const sameCompany = req.token?.user?.companyId === listing.users.companyId.toString();

    if (!isOwner && !isAdmin && !sameCompany) {
      throw new ForbiddenError();
    }

    await PrismaClient.listing.update({
      where: { id },
      data: {
        deletedAt: new Date().toISOString(),
      },
    });

    res.status(204).end();
  });
