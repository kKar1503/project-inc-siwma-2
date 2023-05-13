import client from '@inc/db';
import sibClient, { changeAPIKey } from './sib';
import getAPIKey from './apiKey/apiKeys';
import { BulkEmailRequestBody } from './templates/sibTemplates';
import { BulkEmailResponseBody } from './types/BulkEmailResponseBody';

/* This function sends emails to multiple recipients.
 * It uses SendInBlue's Transactional Email API.
 * You should use this function to send emails to multiple users at once instead of using a single email function multiple times.
 */

export default async function sendNotificationEmail(
  parameters: BulkEmailRequestBody
): Promise<BulkEmailResponseBody> {
  const data: BulkEmailRequestBody = parameters;

  // DEBUG
  // console.log('Sending email to:');
  // data.messageVersions.forEach((body) => {
  //   console.log(body.to[0].email);
  // });

  let apiKey: string | undefined;
  let senderEmail: string | undefined;

  if (process.env.NODE_ENV === 'development') {
    // If in development, get the API key from the database.
    const retrieved = await getAPIKey(data.messageVersions.length);
    apiKey = retrieved.key?.key;
    senderEmail = retrieved.key?.senderEmail;
  } else {
    apiKey = process.env.SIB_API_KEY;
    senderEmail = process.env.SIB_SENDER_EMAIL;
    // Otherwise, get the API key from the environment variables.
  }

  if (!apiKey || !senderEmail) {
    return {
      success: false,
      message: 'An unexpected error occurred while sending the email.',
    };
  }

  changeAPIKey(apiKey); // Set the API Key in the SendInBlue client

  const apiInstance = new sibClient.TransactionalEmailsApi();

  const email = {
    sender: {
      email: senderEmail,
      name: 'SIWMA Marketplace',
    },
    subject: data.subject,
    htmlContent: data.htmlContent,
    messageVersions: data.messageVersions,
  };

  try {
    await apiInstance.sendTransacEmail(email);

    if (process.env.NODE_ENV === 'development') {
      // If in development, update the API Key usage count
      await client.sibkeys.update({
        where: {
          key: apiKey,
        },
        data: {
          remainingCount: {
            decrement: data.messageVersions.length,
          },
        },
      });
    }

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
