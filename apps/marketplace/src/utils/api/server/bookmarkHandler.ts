import PrismaClient, { Listing } from '@inc/db';

export enum UpdateType {
  CREATE = 'CREATE',
  PRICE_INCREASE = 'PRICE_INCREASE',
  PRICE_DECREASE = 'PRICE_DECREASE',
  SOLD_OUT = 'SOLD_OUT',
  RESTOCKED = 'RESTOCKED',
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
  let updateString = '';
  switch (updateType) {
    case UpdateType.CREATE:
      updateString = 'been created.';
      break;
    case UpdateType.PRICE_INCREASE:
      updateString = 'increased in price.';
      break;
    case UpdateType.PRICE_DECREASE:
      updateString = 'decreased in price.';
      break;
    case UpdateType.SOLD_OUT:
      updateString = 'sold out.';
      break;
    case UpdateType.RESTOCKED:
      updateString = 'been restocked.';
      break;
    case UpdateType.UPDATE:
      updateString = 'been changed.';
      break;
    case UpdateType.DELETE:
      updateString = 'been deleted.';
      break;
    default:
      updateString = 'been changed.';
  }

  // TODO: Currently the notification just get changed to ID of the listing
  // This is not ideal, someone need to refactor to use the listingItem name
  switch (notificationType) {
    case 'LISTING':
      return `${listing?.id || 'A listing you bookmarked'} has ${updateString}.`;
    case 'COMPANY':
      return `${listing?.id || 'a listing'} from ${
        creator || 'a company you bookmarked'
      } has ${updateString}.`;
    case 'USER':
      return `${listing?.id || 'a listing'} from ${
        creator || 'a user you bookmarked'
      } has ${updateString}.`;
    default:
      return `${listing?.id || 'a listing'} from ${
        creator || 'an entity you bookmarked'
      } has ${updateString}.`;
  }
}

/* This function must be called when a listing is created, updated, or deleted.
 * It will update the Notification tables based on Bookmarks.
 * This main function automatically handles all the cases depending on the update type.
 */
export async function handleBookmarks(updateType: UpdateType, listing: Listing) {
  // 1. Get bookmarks from ListingBookmarks, CompaniesBookmarks, and UsersBookmarks

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

  // 2. Sort bookmarks into respective arrays, check if notifications are duplicated across listingNotifications, userNotifications, and companiesNotifications

  const listingBookmarks = promiseResults[0];
  let userBookmarks = promiseResults[1];
  let companiesBookmarks = promiseResults[2]?.companiesBookmarks;

  if (listingBookmarks.length === 0 && userBookmarks.length === 0 && !companiesBookmarks) {
    return;
  }

  // 2.1. Remove duplicated userBookmarks
  userBookmarks = userBookmarks.filter(
    (userBookmark) =>
      !listingBookmarks.some((listingBookmark) => listingBookmark.userId === userBookmark.userId)
  );

  // 2.2. Remove duplicated companyBookmarks
  if (companiesBookmarks) {
    companiesBookmarks = companiesBookmarks.filter(
      (companyBookmark) =>
        !listingBookmarks.some(
          (listingBookmark) => listingBookmark.userId === companyBookmark.userId
        ) && !userBookmarks.some((userBookmark) => userBookmark.userId === companyBookmark.userId)
    );
  }

  // MARK: - Handler Subfunctions

  async function createNotifications() {
    // Create notifications for each user who bookmarked this listing, the user that created this listing, and the company that user belongs to

    // Create notifications for each user who bookmarked this listing
    const listingNotificationsPromises = listingBookmarks.map((bookmark) =>
      PrismaClient.listingNotifications.create({
        data: {
          userId: bookmark.userId,
          targetListing: listing.id,
          notificationString: getNotificationString(
            NotificationType.LISTING,
            updateType,
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
            updateType,
            listing.owner,
            listing
          ),
        },
      })
    );

    // Find the company that the user belongs to
    const company = await PrismaClient.companies.findFirst({
      where: {
        users: { some: { id: listing.owner } },
      },
      select: {
        name: true,
      },
    });

    // Create notifications for each user who bookmarked the company of the owner of this listing
    const companiesNotificationsPromises = companiesBookmarks?.map((bookmark) =>
      PrismaClient.companiesNotifications.create({
        data: {
          userId: bookmark.userId,
          targetCompany: bookmark.companyId,
          notificationString: getNotificationString(
            NotificationType.COMPANY,
            updateType,
            company?.name,
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

  /* If extra checks are needed, refer to the lines of code at the bottom of this file in this commit:
  https://github.com/kKar1503/project-inc-siwma-2/blob/71ed1e132a74f392d189ccf7a056dc5f0cff41bb/apps/marketplace/src/utils/api/server/bookmarkHandler.ts
   * These lines were removed as they are currently redundant 
  */

  await createNotifications();
}
