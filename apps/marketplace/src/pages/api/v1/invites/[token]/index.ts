import { apiHandler, formatAPIResponse } from '@/utils/api';
import { z } from 'zod';
import client from '@inc/db';
import { NotFoundError } from '@/errors';

const tokenSchema = z.object({
  token: z.string(),
});

export default apiHandler({
  allowNonAuthenticated: true,
}).get(async (req, res) => {
  const { token } = tokenSchema.parse(req.query);

  const invite = await client.invite.findFirst({
    where: {
      token,
    },
    select: {
      id: true,
      email: true,
      name: true,
      companyId: true,
    },
  });

  if (!invite) {
    throw new NotFoundError('invite');
  }

  return res.status(200).json(formatAPIResponse({ data: invite }));
});
