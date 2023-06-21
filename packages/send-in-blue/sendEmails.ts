import client from '@inc/db';
import sibClient, { changeAPIKey } from './sib';
import getAPIKey from './apiKey/apiKeys';
import { BulkEmailResponseBody } from './types/BulkEmailResponseBody';
import { InvalidApiKeyError, InvalidSenderEmailError, EmailSendError } from '@inc/errors';
import { SendSmtpEmail } from 'sib-api-v3-sdk';

/* This function sends emails to multiple recipients.
 * It uses SendInBlue's Transactional Email API.
 * You should use this function to send emails to multiple users at once instead of using a single email function multiple times.
 */

export default async function sendEmails<T extends Record<string, string>>(
  parameters: SendSmtpEmail<T>
): Promise<BulkEmailResponseBody> {
  const data: SendSmtpEmail = parameters;

  let apiKey: string | undefined;
  let senderEmail: string | undefined;

  if (process.env.NODE_ENV === 'development' && data.messageVersions) {
    // If in development, get the API key from the database.
    const retrieved = await getAPIKey(data.messageVersions.length);
    apiKey = retrieved.key?.key;
    senderEmail = retrieved.key?.senderEmail;
  } else {
    // Otherwise, get the API key from the environment variables.
    apiKey = process.env.SIB_API_KEY;
    senderEmail = process.env.SIB_SENDER_EMAIL;
  }

  if (!apiKey) {
    return {
      success: false,
      error: new InvalidApiKeyError(),
    };
  }

  if (!senderEmail) {
    return {
      success: false,
      error: new InvalidSenderEmailError(),
    };
  }

  changeAPIKey(apiKey); // Set the API Key in the SendInBlue client

  const apiInstance = new sibClient.TransactionalEmailsApi();

  const email: SendSmtpEmail = {
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

    if (process.env.NODE_ENV === 'development' && data.messageVersions) {
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
    return {
      success: false,
      error: new EmailSendError(),
    };
  }
}