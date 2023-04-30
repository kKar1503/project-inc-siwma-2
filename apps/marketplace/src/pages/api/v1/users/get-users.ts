import { apiHandler, formatAPIResponse } from '@/utils/api';
import { z } from 'zod';
import client from '@inc/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export const getUsersRequestBody = z.object({
  lastIdPointer: z.string().optional(),
  limit: z.number().optional(),
});

let lastIdPointer: string | undefined;
let limit: number | undefined;

export default apiHandler({ allowNonAuthenticated: false }).get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.body) {
      const parsedBody = getUsersRequestBody.safeParse(req.body);

      if (!parsedBody.success) {
        return res
          .status(422)
          .json(formatAPIResponse({ status: '422', detail: 'invalid request body' }));
      }

      lastIdPointer = parsedBody.data?.lastIdPointer;
      limit = parsedBody.data?.limit;
    }

    const users = await client.users.findMany({
      where: {
        id: {
          gt: lastIdPointer,
        },
      },
      take: limit,
    });

    return res
      .status(200)
      .json(formatAPIResponse({ status: '200', detail: 'success', data: users }));
  }
);
