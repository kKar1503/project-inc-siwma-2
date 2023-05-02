import client from '@inc/db';
import sibClient, { changeAPIKey } from '@inc/send-in-blue';
import getAPIKey from './api-keys';

/* This function sends emails to multiple recipients.
 * It uses SendInBlue's Transactional Email API.
 * You should use this function to send emails to multiple users at once instead of using a single email function multiple times.
 */

/* htmlContent example
To use a variable in the HTML content, use {{params.variableName}} and make sure to include the variable in the params object.
You may want to extend the params object to include more variables.

<!DOCTYPE html>
<html>
<body>
<h1>Hi,</h1>
You have been invited to join the SIWMA Marketplace as a member of {{params.message}}.
Please click the following link to register your account:
<a href="https://google.com">https://google.com</a>
If this email was sent to you by mistake, please ignore it.
</body>
</html> 
*/

export type BulkEmailRequestBody = {
  htmlContent: string; // HTML content of the email
  subject: string; // Subject of the email
  messageVersions: {
    // Each messageVersion is a different email that will be sent to a different user.
    to: {
      email: string; // Email address of the recipient
      name: string; // Name of the recipient (to be shown in the email's recipient field)
    }[];
    /* SendInBlue requires this to be an array.
    But if you do this, every user with this messageVersion will receive the same email.
    So we just create as many messageVersions as there are users.
    */
    params: {
      name: string; // Name of the recipient (to be shown in the email's content)
      message: string; // Message to be displayed in the email
    };
  }[];
};

export type BulkEmailResponseBody = {
  success: boolean;
  message?: string;
};

export default async function sendNotificationEmail(
  parameters: BulkEmailRequestBody
): Promise<BulkEmailResponseBody> {
  const data: BulkEmailRequestBody = parameters;

  // DEBUG
  // console.log('Sending email to:');
  // data.messageVersions.forEach((body) => {
  //   console.log(body.to[0].email);
  // });

  const apiKey = await getAPIKey(data.messageVersions.length);

  if (!apiKey || !apiKey.key?.key) {
    return {
      success: false,
      message: 'No API key found.',
    };
  }

  changeAPIKey(apiKey.key?.key);

  const apiInstance = new sibClient.TransactionalEmailsApi();

  const email = {
    sender: {
      email: apiKey.key.senderEmail,
      name: 'SIWMA Marketplace',
    },
    subject: data.subject,
    htmlContent: data.htmlContent,
    messageVersions: data.messageVersions,
  };

  try {
    await apiInstance.sendTransacEmail(email);

    // Update the API Key usage count
    await client.sibkeys.update({
      where: {
        key: apiKey.key?.key,
      },
      data: {
        remainingCount: {
          decrement: data.messageVersions.length,
        },
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    // DEBUG
    // console.log(error);
    return {
      success: false,
      message: 'An unexpected error occurred while sending the email.',
    };
  }
}
