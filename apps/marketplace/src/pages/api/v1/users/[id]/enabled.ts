import { apiHandler, formatAPIResponse } from '@/utils/api';
import { userSchema } from '@/utils/api/server/zod';
import client from '@inc/db';
import { NotFoundError } from '@inc/errors';

export default apiHandler({
  allowAdminsOnly: true,
}).patch(async (req, res) => {
  const { id } = userSchema.userId.parse(req.query);

  // Verify that the user exists
  const userExists = await client.users.findUnique({
    where: {
      id,
    },
  });

  if (!userExists) {
    throw new NotFoundError('User');
  }

  // Get user's enabled status
  const fetchedUser = await client.users.findUnique({
    where: {
      id,
    },
    select: {
      enabled: true,
    },
  });

  const user = await client.users.update({
    where: {
      id,
    },
    data: {
      enabled: !fetchedUser?.enabled,
    },
  });

  return res.status(200).json(formatAPIResponse({ visible: user.enabled }));
});
