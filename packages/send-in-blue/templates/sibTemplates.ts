// Emails are structured as HTML

export enum EmailTemplate {
  INVITE,
  NOTIFICATION,
}

export function getContentFor(template: EmailTemplate): string {
  /* When adding a new template, make sure to add it to the switch statement below.
   * To use a variable in the HTML content, use {{params.variableName}} and make sure to include the variable in the params object.
   * Create a new EmailRequestBody type that extends the params object to include the appropriate variables.
   */
  switch (template) {
    case EmailTemplate.INVITE:
      return `
        <!DOCTYPE html>
        <html>
        <body>
        <h1>Hi {{params.name}},</h1>
        You have been invited to join the SIWMA Marketplace as a member of {{params.companyName}}.
        Please click the following link to register your account:
        <a href="{{params.registrationUrl}}">Join the SIWMA Marketplace</a>
        If this email was sent to you by mistake, please ignore it.
        <br>
        Thank you,
        The SIWMA Marketplace Team
        </body>
        </html> 
        `;
    case EmailTemplate.NOTIFICATION:
      return `
        <!DOCTYPE html>
        <html>
        <body>
        <h1>Hi {{params.name}},</h1>
        Here are your latest notifications from the SIWMA Marketplace:
        <br>
        {{params.notifications}}
        <br>
        If this email was sent to you by mistake, please ignore it.
        <br>
        Thank you,
        The SIWMA Marketplace Team
        <br>
        <a href="{{params.notificationSettingsUrl}}">Click to adjust your notification settings</a>
        </body>
        </html> 
        `;
  }
}

/* SendInBlue requires messageVersions to be an array.
 * But if you do this, every user specified in the messageVersions array will receive the same email.
 * So we just create as many messageVersions as there are users.
 * Each messageVersion is a different email that will be sent to a different user.
 */

// When adding a new template, build on top of this class.
export abstract class BulkEmailRequestBody {
  htmlContent: string; // HTML content of the email
  subject: string; // Subject of the email
  messageVersions: {
    to: {
      email: string; // Email address of the recipient
      name: string; // Name of the recipient (to be shown in the email's recipient field)
    }[];
    params: {};
  }[];
}

export class BulkInviteEmailRequestBody extends BulkEmailRequestBody {
  htmlContent: string; // HTML content of the email
  subject: string; // Subject of the email
  messageVersions: {
    to: {
      email: string; // Email address of the recipient
      name: string; // Name of the recipient (to be shown in the email's recipient field)
    }[];
    params: {
      name: string; // Name of the recipient (to be shown in the email's content)
      companyName: string; // Name of the user's company
      registrationUrl: string; // URL for the recipient to finish registration
    };
  }[];
}

export class BulkNotificationEmailRequestBody extends BulkEmailRequestBody {
  htmlContent: string; // HTML content of the email
  subject: string; // Subject of the email
  messageVersions: {
    to: {
      email: string; // Email address of the recipient
      name: string; // Name of the recipient (to be shown in the email's recipient field)
    }[];
    params: {
      name: string; // Name of the recipient (to be shown in the email's content)
      notifications: string; // User's notifications, combined into a single string
      notificationSettingsUrl: string; // URL for the recipient to adjust their notification settings
    };
  }[];
}