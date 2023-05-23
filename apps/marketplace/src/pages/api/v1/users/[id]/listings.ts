import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@inc/errors';
import { listingSchema } from '@/utils/api/server/zod';

// -- Functions --//
/**
 * Checks if a user exists
 * @param uuid The user UUID
 * @returns The user if it exists
 */
export async function checkUserExists(uuid: string) {
  // Check if the user exists
  const user = await PrismaClient.user.findUnique({
    where: { uuid },
  });

  // Check if the user exists
  if (!user) {
    throw new NotFoundError(`User with UUID '${uuid}'`);
  }

  return user;
}

export default apiHandler()
  .get(async (req, res) => {
    // Get the user UUID from the request parameters
    const uuid = req.params.uuid;

    // Ensure the user exists
    await checkUserExists(uuid);

    // Retrieve all listings from the database with the provided user UUID
    const listings = await PrismaClient.listing.findMany({
      where: { userId: uuid },
      include: {
        users: true,
        listingsParametersValues: true,
        offersOffersListingTolistings: true,
        reviewsReviewsListingTolistings: true,
      },
    });

    // Format the response
    const formattedListings = listings.map((listing) => {
      return formatAPIResponse(listing);
    });

    // Return the result
    res.status(200).json(formattedListings);
  });
