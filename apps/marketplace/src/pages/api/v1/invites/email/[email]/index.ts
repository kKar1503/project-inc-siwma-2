import { apiHandler } from '@inc/api/api';
import { inviteSchema } from '@inc/api/api/server/zod';
import client from '@inc/db';
import { NotFoundError } from '@inc/errors';

export default apiHandler({
  allowAdminsOnly: true,
}).delete(async (req, res) => {
  const { email } = inviteSchema.email.delete.query.parse(req.query);

  // Find the invite
  const invite = await client.invite.findFirst({
    where: {
      email,
    },
  });

  if (!invite) {
    throw new NotFoundError('invite');
  }

  await client.invite.delete({
    where: {
      id: invite.id,
    },
  });

  return res.status(204).end();
});
