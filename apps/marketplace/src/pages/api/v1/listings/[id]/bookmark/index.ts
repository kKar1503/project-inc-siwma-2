import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { ForbiddenError } from '@inc/errors';
import { parseListingId } from '../..';
import { checkListingExists } from '..';

export default apiHandler().patch(async (req, res) => {
  // Create bookmark
  const id = parseListingId(req.query.id as string);
  const userId = req.token?.user?.id;

  const listing = await checkListingExists(id);

  const isOwner = listing.owner === userId;

  if (isOwner) {
    // Users are not allowed to bookmark their own listings
    throw new ForbiddenError();
  }

  // Check if bookmark already exists
  const bookmark = await PrismaClient.listingBookmarks.findFirst({
    where: {
      listingId: id,
      userId,
    },
  });

  /* If the bookmark exists, we're going to remove it.
   * If the bookmark doesn't exist, we're going to create it.
   * Hence, bookmarked will be true if the bookmark doesn't exist yet.
   */
  const bookmarked = bookmark === null;

  if (bookmark) {
    await PrismaClient.listingBookmarks.delete({
      where: {
        id: bookmark.id,
      },
    });
  } else {
    await PrismaClient.listingBookmarks.create({
      data: {
        listingId: id,
        userId,
      },
    });
  }

  res.status(200).json(formatAPIResponse({ bookmarked }));
});
