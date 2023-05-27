import PrismaClient, { Listing } from '@inc/db';

/* Should handle bookmarks when:
 * A listing is created
 * A listing is updated
 * A listing is deleted
 */

enum UpdateType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

enum NotificationType {
  LISTING = 'LISTING',
  COMPANY = 'COMPANY',
  USER = 'USER',
}

function getNotificationString(
  notificationType: NotificationType,
  updateType: UpdateType,
  creator?: string,
  listing?: Listing
) {
  const formattedUpdateType = `${updateType.toLowerCase()}d`;

  switch (notificationType) {
    case 'LISTING':
      return `${listing?.name || 'A listing you bookmarked'} has been ${formattedUpdateType}.`;
    case 'COMPANY':
      return `${creator || 'A company you bookmarked'} has ${formattedUpdateType} ${
        listing?.name || 'a listing'
      }.`;
    case 'USER':
      return `${creator || 'A user you bookmarked'} has ${formattedUpdateType} ${
        listing?.name || 'a listing'
      }.`;
    default:
      return `${creator || 'A user you bookmarked'} has ${formattedUpdateType} ${
        listing?.name || 'a listing'
      }.`;
  }
}

/* This function must be called when a listing is created, updated, or deleted.
 * It will update the Notification tables based on Bookmarks.
 * This main function automatically handles all the cases depending on the update type.
 */
export default async function handleBookmarks(updateType: UpdateType, listing: Listing) {
  async function handleCreation() {
    /* Get bookmarks from ListingBookmarks, CompaniesBookmarks, and UsersBookmarks
     * Create notifications for each user who bookmarked this listing, the user that created this listing, and the company that user belongs to
     */

    // Get bookmarks from ListingBookmarks
    const listingBookmarksPromise = PrismaClient.listingBookmarks.findMany({
      where: { listingId: listing.id },
      include: {
        users: true,
      },
    });

    // Get bookmarks from CompaniesBookmarks
    const userBookmarksPromise = PrismaClient.userBookmarks.findMany({
      where: { targetUser: listing.owner },
      include: {
        usersUserBookmarksUserIdTousers: true,
      },
    });

    // companyId is not stored in the listing, so we get companiesBookmarks by querying companies with the owner id
    const companiesBookmarksPromise = PrismaClient.companies.findFirst({
      where: { users: { some: { id: listing.owner } } },
      select: {
        companiesBookmarks: true,
      },
    });

    // Wait for all promises to resolve concurrently
    const promiseResults = await Promise.all([
      listingBookmarksPromise,
      userBookmarksPromise,
      companiesBookmarksPromise,
    ]);

    const listingBookmarks = promiseResults[0];
    let userBookmarks = promiseResults[1];
    let companiesBookmarks = promiseResults[2]?.companiesBookmarks;

    // Check if notifications are duplicated across listingNotifications, userNotifications, and companiesNotifications
    if (listingBookmarks.length === 0 && userBookmarks.length === 0 && !companiesBookmarks) {
      return;
    }

    // Remove duplicated userBookmarks
    userBookmarks = userBookmarks.filter(
      (userBookmark) =>
        !listingBookmarks.some((listingBookmark) => listingBookmark.userId === userBookmark.userId)
    );

    if (companiesBookmarks) {
      // Remove duplicated companyBookmarks
      companiesBookmarks = companiesBookmarks.filter(
        (companyBookmark) =>
          !listingBookmarks.some(
            (listingBookmark) => listingBookmark.userId === companyBookmark.userId
          ) && !userBookmarks.some((userBookmark) => userBookmark.userId === companyBookmark.userId)
      );
    }

    // Create notifications for each user who bookmarked this listing
    const listingNotificationsPromises = listingBookmarks.map((bookmark) =>
      PrismaClient.listingNotifications.create({
        data: {
          userId: bookmark.userId,
          targetListing: listing.id,
          notificationString: getNotificationString(
            NotificationType.LISTING,
            UpdateType.CREATE,
            listing.owner,
            listing
          ),
        },
      })
    );

    // Create notifications for each user who bookmarked the owner of this listing
    const userNotificationsPromises = userBookmarks.map((bookmark) =>
      PrismaClient.userNotifications.create({
        data: {
          userId: bookmark.userId,
          targetUser: listing.owner,
          notificationString: getNotificationString(
            NotificationType.USER,
            UpdateType.CREATE,
            listing.owner,
            listing
          ),
        },
      })
    );

    // Create notifications for each user who bookmarked the company of the owner of this listing
    const companiesNotificationsPromises = companiesBookmarks?.map((bookmark) =>
      PrismaClient.companiesNotifications.create({
        data: {
          userId: bookmark.userId,
          targetCompany: bookmark.companyId,
          notificationString: getNotificationString(
            NotificationType.COMPANY,
            UpdateType.CREATE,
            listing.owner,
            listing
          ),
        },
      })
    );

    // Wait for all notification promises to resolve concurrently
    await Promise.all([
      ...listingNotificationsPromises,
      ...userNotificationsPromises,
      ...(companiesNotificationsPromises || []),
    ]);
  }

  switch (updateType) {
    case 'CREATE':
      handleCreation();
      break;
    case 'UPDATE':
      // Update existing bookmarks
      break;
    case 'DELETE':
      // Delete existing bookmarks
      break;
    default:
      throw new Error('Invalid update type');
  }
}
