import { apiHandler, formatAPIResponse } from '@/utils/api';
import { userSchema } from '@/utils/api/server/zod';
import client from '@inc/db';
import { NotFoundError, ParamError } from '@inc/errors';

export default apiHandler().patch(async (req, res) => {
  const { id } = userSchema.userId.parse(req.query);
  if (!id) {
    throw new ParamError('id');
  }

  const userId = req.token?.user.id;
  const targetUser = id as string;
  let isBookmarked;

  // Verify that the target user exists
  const userExists = await client.users.findUnique({
    where: {
      id: targetUser,
    },
  });

  if (!userExists) {
    throw new NotFoundError('User');
  }

  // Get bookmark status
  const getUserBookmarkStatus = await client.userBookmarks.findFirst({
    where: {
      userId: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
      targetUser: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    },
    select: {
      id: true,
      userId: true,
      targetUser: true,
    },
  });

  if (getUserBookmarkStatus === null && userId !== targetUser) {
    const response = await client.userBookmarks.create({
      data: {
        userId,
        targetUser,
      },
    });

    isBookmarked = true;
  } else if (userId === targetUser) {
    throw new ParamError('Cannot bookmark self');
  } else {
    const response = await client.userBookmarks.delete({
      where: {
        id: getUserBookmarkStatus?.id,
      },
    });

    isBookmarked = false;
  }

  return res.status(200).json(formatAPIResponse({ bookmarked: isBookmarked }));
});
