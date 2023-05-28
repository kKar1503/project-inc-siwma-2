// Emails are structured as HTML

import { SendSmtpEmailTo, SendSmtpEmail } from 'sib-api-v3-sdk';
import invite from './InviteTemplate.html';
import notification from './NotificationTemplate.html';
import forgetPassword from './ForgetPasswordTemplate.html';

export enum EmailTemplate {
  INVITE,
  NOTIFICATION,
  FORGETPASSWORD
}

export function getContentFor(template: EmailTemplate): string {
  /* When adding a new template, make sure to add it to the switch statement below.
   * To use a variable in the HTML content, use {{params.variableName}} and make sure to include the variable in the params object.
   * Create a new EmailRequestBody type that extends the params object to include the appropriate variables.
   */

  switch (template) {
    case EmailTemplate.INVITE:
      return invite;
    case EmailTemplate.NOTIFICATION:
      return notification;
    case EmailTemplate.FORGETPASSWORD:
      return forgetPassword;
  }
}

type BulkInviteRequestParams = {
  name: string; // Name of the recipient (to be shown in the email's content)
  companyName: string; // Name of the user's company
  registrationUrl: string; // URL for the recipient to finish registration
};

export class BulkInviteEmailRequestBody implements SendSmtpEmail<BulkInviteRequestParams> {
  htmlContent!: string; // HTML content of the email
  subject!: string; // Subject of the email
  messageVersions: {
    to: SendSmtpEmailTo[];
    params?: {
      name: string; // Name of the recipient (to be shown in the email's content)
      companyName: string; // Name of the user's company
      registrationUrl: string; // URL for the recipient to finish registration
    };
  }[];
}

type BulkNotificationRequestParams = {
  name: string; // Name of the recipient (to be shown in the email's content)
  notifications: string; // User's notifications, combined into a single string
  notificationSettingsUrl: string; // URL for the recipient to adjust their notification settings
};

export class BulkNotificationEmailRequestBody
  implements SendSmtpEmail<BulkNotificationRequestParams>
{
  htmlContent!: string; // HTML content of the email
  subject!: string; // Subject of the email
  messageVersions: {
    to: SendSmtpEmailTo[];
    params: {
      name: string; // Name of the recipient (to be shown in the email's content)
      notifications: string; // User's notifications, combined into a single string
      notificationSettingsUrl: string; // URL for the recipient to adjust their notification settings
    };
  }[];
}
