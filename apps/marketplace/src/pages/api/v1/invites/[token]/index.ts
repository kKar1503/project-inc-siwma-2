import { apiHandler, formatAPIResponse } from '@/utils/api';
import { z } from 'zod';
import client from '@inc/db';
import { NotFoundError } from '@inc/errors';

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

  const mappedInvite = {
    id: invite.id.toString(),
    email: invite.email,
    name: invite.name,
    companyId: invite.companyId.toString(),
  };

  return res.status(200).json(formatAPIResponse(mappedInvite));
});
