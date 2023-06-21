import PrismaClient from '@inc/db';
import {
  getContentFor,
  EmailTemplate,
  BulkNotificationEmailRequestBody,
} from '@inc/send-in-blue/templates';
import sendEmails from '@inc/send-in-blue/sendEmails';
import { EmailTemplateNotFoundError } from '@inc/errors';

// Read Notifications from DB

export default async function handleNotifications(): Promise<void> {
  type Notification = {
    userId: string;
    targetUser?: string;
    targetListing?: number;
    targetCompany?: number;
    notificationString: string;
  };

  const notifications: Notification[] = [];

  try {
    await PrismaClient.userNotifications.findMany({}).then((data) => {
      notifications.push(...data);
    });

    await PrismaClient.listingNotifications.findMany({}).then((data) => {
      notifications.push(...data);
    });

    await PrismaClient.companiesNotifications.findMany({}).then((data) => {
      notifications.push(...data);
    });
  } catch (e) {
    // No critical errors are thrown here
  }

  if (notifications.length === 0) {
    return;
  }

  // groupedNotifications is an array of subarrays, each subarray containing notifications for a single user
  const groupedNotifications: Notification[][] = [];

  // Group notifications by user
  notifications.forEach((notification) => {
    const userNotifications = groupedNotifications.find(
      (group) => group[0]?.userId === notification.userId
    );

    if (userNotifications) {
      userNotifications.push(notification);
    } else {
      groupedNotifications.push([notification]);
    }
  });

  let content: string;
  try {
    content = getContentFor(EmailTemplate.NOTIFICATION);
  } catch (e) {
    throw new EmailTemplateNotFoundError();
  }

  const bulkNotificationEmailRequestBody: BulkNotificationEmailRequestBody = {
    htmlContent: content,
    subject: 'Updates from the SIWMA Marketplace',
    messageVersions: [],
  };

  // All notifications in a group belong to the same user, so we only need to fetch the user data once per group
  const userFetchPromises = groupedNotifications.map((group) => {
    const firstNotification = group[0];
    return PrismaClient.users.findUnique({
      where: {
        id: firstNotification.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  });

  const users = await Promise.all(userFetchPromises);

  users.forEach((user) => {
    if (!user) {
      return;
    }

    const userNotifications = groupedNotifications.find((group) => group[0]?.userId === user.id);

    if (!userNotifications) {
      return;
    }

    // Create a string of notifications for the user, separated by a newline
    const notificationsString: string = userNotifications
      .map((notification) => notification.notificationString)
      .join('\n');

    bulkNotificationEmailRequestBody.messageVersions.push({
      to: [
        {
          email: user.email,
          name: user.name,
        },
      ],
      params: {
        name: user.name,
        notifications: notificationsString,
      },
    });
  });

  await sendEmails(bulkNotificationEmailRequestBody);

  // Delete all notifications
  await PrismaClient.userNotifications.deleteMany({});
  await PrismaClient.listingNotifications.deleteMany({});
  await PrismaClient.companiesNotifications.deleteMany({});
}
