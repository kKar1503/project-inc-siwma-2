import client from '@inc/db';
import { GetAPIKeyResponseBody } from '@inc/send-in-blue/types/GetAPIKeyResponseBody';

export default async function getAPIKey(numEmails: number): Promise<GetAPIKeyResponseBody> {
  const key = await client.sibkeys.findFirst({
    where: {
      remainingCount: {
        gte: 300 - numEmails,
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
