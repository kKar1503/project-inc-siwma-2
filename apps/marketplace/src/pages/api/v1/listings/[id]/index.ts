import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@/errors';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { listingsRequestBody, formatSingleListingResponse } from '..';

// -- Functions --//
function parseListingId($id: string) {
  // Parse and validate param id provided
  const id = parseInt($id, 10);

  // Check if the parameter id is valid
  if (Number.isNaN(id)) {
    throw new NotFoundError(`Listing with id '${id}'`);
  }

  return id;
}
/**
 * Checks if a listing exists
 * @param id The listing id
 * @returns The listing if it exists
 */
async function checkListingExists($id: string | number) {
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
  .delete(async (req, res) => {
    const id = parseListingId(req.query.id as string);
    const userId = req.token?.user?.id;
    const userRole = req.token?.user?.role;

    const listing = await checkListingExists(id);

    const isOwner = listing.owner === userId;
    const isAdmin = userRole && userRole >= 1;
    const sameCompany = req.token?.user?.company === listing.users.companyId;

    if (!isOwner && !isAdmin && !sameCompany) {
      return res.status(403).json({
        errors: [{ status: 403, detail: 'Forbidden' }],
      });
    }

    await PrismaClient.listing.delete({
      where: { id },
    });

    res.status(204).end();
  });
