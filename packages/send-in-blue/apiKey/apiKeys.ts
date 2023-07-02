import client from '@inc/db';
import { GetAPIKeyResponseBody } from '../types/GetAPIKeyResponseBody';

export default async function getAPIKey(numEmails: number): Promise<GetAPIKeyResponseBody> {
  const key = await client.sibkeys.findFirst({
    where: {
      remainingCount: {
        gte: numEmails,
      },
    },
  });

  if (!key) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    key,
  };
}
