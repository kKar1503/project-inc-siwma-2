import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError, ForbiddenError } from '@inc/errors';
import { formatSingleListingResponse } from '..';
import { parseListingId } from '@/utils/api';

// -- Functions --//

/**
 * Checks if a listing exists
 * @param id The listing id
 * @returns The listing if it exists
 */
export async function checkListingExists($id: string | number) {
  // Parse and validate listing id provided
  const id = typeof $id === 'number' ? $id : parseListingId($id);

  // Check if the listing exists
  const listing = await PrismaClient.listing.findUnique({
    where: { id },
    include: {
      users: {
        select: {
          companyId: true,
        },
      },
      listingsParametersValues: true, // add this line
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
    // Retrieve the listing from the database
    const id = parseListingId(req.query.id as string);
    const listing = await checkListingExists(id);

    // Return the result
    res.status(200).json(formatAPIResponse(formatSingleListingResponse(listing)));
  })
  .put(async (req, res) => {
    allowAdminsOnly: true;

    const id = parseListingId(req.query.id as string);
    const userId = req.token?.user?.id;
    const userRole = req.token?.user?.role;

    const listing = await checkListingExists(id);

    const isOwner = listing.owner === userId;
    const isAdmin = userRole && userRole >= 1;
    const sameCompany = req.token?.user?.company === listing.users.companyId;

    if (!isOwner && !isAdmin && !sameCompany) {
      throw new ForbiddenError();
    }

    // Update the listing with the request data
    const data = req.body;
    const updatedListing = await PrismaClient.listing.update({
      where: { id },
      data,
      include: {
        users: {
          select: {
            companyId: true,
          },
        },
        listingsParametersValues: true,
      },
    });

    res.status(200).json(formatAPIResponse(formatSingleListingResponse(updatedListing)));
  })
  .delete(async (req, res) => {
    allowAdminsOnly: true;

    const id = parseListingId(req.query.id as string);
    const userId = req.token?.user?.id;
    const userRole = req.token?.user?.role;

    const listing = await checkListingExists(id);

    const isOwner = listing.owner === userId;
    const isAdmin = userRole && userRole >= 1;
    const sameCompany = req.token?.user?.company === listing.users.companyId;

    if (!isOwner && !isAdmin && !sameCompany) {
      throw new ForbiddenError();
    }

    await PrismaClient.listing.delete({
      where: { id },
    });

    res.status(204).end();
  });
