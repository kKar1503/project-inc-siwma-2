import { apiHandler, formatAPIResponse } from '@/utils/api';
import { z } from 'zod';
import client from '@inc/db';

const emailSchema = z.object({
  email: z.string(),
});

export default apiHandler({
  allowNonAuthenticated: false,
  allowAdminsOnly: true
}).delete(async (req, res) => {
  const parsedBody = emailSchema.safeParse(req.query);

  if (!parsedBody.success) {
    return res
      .status(422)
      .json(formatAPIResponse({ status: '422', detail: 'invalid request body' }));
  }

  const { email } = parsedBody.data;

  const invite = await client.invite.deleteMany({
    where: {
      email,
    },
  });

  if (!invite) {
    return res.status(404).json(formatAPIResponse({ status: '404', detail: 'invite not found' }));
  }

  return res.status(200).json(formatAPIResponse({ status: '200', data: invite }));
});
