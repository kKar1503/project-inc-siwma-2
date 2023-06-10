import PrismaClient from '@inc/db';
import { getContentFor, EmailTemplate } from '@inc/send-in-blue/templates';
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

    // groupedNotifications will be an array of subarrays, each subarray containing notifications for a single user
    const groupedNotifications = notifications.reduce(
      (acc: { userId: string }[][], notification) => {
        const index = acc.findIndex((group) => group[0].userId === notification.userId);
        if (index === -1) {
          acc.push([notification]);
        } else {
          acc[index].push(notification);
        }
        return acc;
      },
      []
    );

    let content: string;
    try {
      content = getContentFor(EmailTemplate.NOTIFICATION);
    } catch (e) {
      throw new EmailTemplateNotFoundError();
    }

    const messageVersions: any[] = [];

    const userFetchPromises = groupedNotifications.flatMap((group) =>
      group.map((notification) =>
        PrismaClient.users.findUnique({
          where: {
            id: notification.userId,
          },
          select: {
            name: true,
            email: true,
          },
        })
      )
    );

    const users = await Promise.all(userFetchPromises);

    users.forEach((user) => {
      if (!user) {
        return;
      }

      messageVersions.push({
        to: [
          {
            email: user.email,
            name: user.name,
          },
        ],
        params: {
          name: user.name,
          notifications: '',
          notificationSettingsUrl: `${process.env.FRONTEND_URL}/notificationSettings`,
        },
      });
    });

    const bulkNotificationEmailRequestBody = {
      content,
      subject: 'New Changes in the SIWMA Marketplace',
      messageVersions,
    };

    await sendEmails(bulkNotificationEmailRequestBody);
  } catch (e) {
    console.log(e);
  }
}
