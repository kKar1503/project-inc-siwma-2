import { apiHandler, formatAPIResponse } from '@/utils/api';
import { z } from 'zod';
import client from '@inc/db';
import { NotFoundError } from '@/errors';

const emailSchema = z.object({
  email: z.string(),
});

export default apiHandler({
  allowAdminsOnly: true,
}).delete(async (req, res) => {
  const { email } = emailSchema.parse(req.query);

  const invite = await client.invite.deleteMany({
    where: {
      email,
    },
  });

  if (!invite) {
    throw new NotFoundError('invite');
  }

  return res.status(200).json(formatAPIResponse({ data: invite }));
});
