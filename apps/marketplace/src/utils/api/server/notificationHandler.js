import PrismaClient from '@inc/db';
import { getContentFor, EmailTemplate } from '@inc/send-in-blue/templates';
import sendEmails from '@inc/send-in-blue/sendEmails';
import { EmailTemplateNotFoundError } from '@inc/errors';

// Read Notifications from DB

export default async function cj() {
  const notifications = [];

  try {
    PrismaClient.userNotifications.findMany({}).then((data) => {
      notifications.push(...data);
    });

    PrismaClient.listingNotifications.findMany({}).then((data) => {
      notifications.push(...data);
    });

    PrismaClient.companiesNotifications.findMany({}).then((data) => {
      notifications.push(...data);
    });

    // groupedNotifications will be an array of subarrays, each subarray containing notifications for a single user
    const groupedNotifications = notifications.reduce((acc, notification) => {
      const index = acc.findIndex((group) => group[0].userId === notification.userId);
      if (index === -1) {
        acc.push([notification]);
      } else {
        acc[index].push(notification);
      }
      return acc;
    }, []);

    let content;
    try {
      content = getContentFor(EmailTemplate.NOTIFICATION);
    } catch (e) {
      throw new EmailTemplateNotFoundError();
    }

    const messageVersions = [];

    for (let i = 0; i < groupedNotifications.length; i++) {
      // Get user email using userId
      const user = PrismaClient.users.findUnique({
        where: {
          id: notifications[i].userId,
        },
        select: {
          name: true,
          email: true,
        },
      });

      messageVersions.push({
        to: [
          {
            email: user.email,
            name: user.name,
          },
        ],
        params: {
          name: user.name,
          notifications: notifications[i].notifications,
          notificationSettingsUrl: `${process.env.FRONTEND_URL}/notificationSettings`,
        },
      });
    }

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
