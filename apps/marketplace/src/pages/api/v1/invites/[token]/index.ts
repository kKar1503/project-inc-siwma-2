import { apiHandler, formatAPIResponse } from '@/utils/api';
import { z } from 'zod';
import client from '@inc/db';

const tokenSchema = z.object({
  token: z.string(),
});

export default apiHandler({
  allowNonAuthenticated: true,
}).get(async (req, res) => {
  const parsedBody = tokenSchema.safeParse(req.query);

  if (!parsedBody.success) {
    return res
      .status(422)
      .json(formatAPIResponse({ status: '422', detail: 'invalid request body' }));
  }

  const { token } = parsedBody.data;

  const invite = await client.invite.findFirst({
    where: {
      token,
    },
    select: {
      id: true,
      email: true,
      name: true,
      company_id: true,
    },
  });

  if (!invite) {
    return res.status(404).json(formatAPIResponse({ status: '404', detail: 'invite not found' }));
  }

  return res.status(200).json(formatAPIResponse({ status: '200', data: invite }));
});
