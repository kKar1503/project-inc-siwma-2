import { apiHandler, formatAPIResponse } from '@/utils/api';
import { userSchema } from '@/utils/api/server/zod';
import client from '@inc/db';
import { NotFoundError, ParamError, BookmarkSelfError } from '@inc/errors';

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
      userId,
      targetUser,
    },
    select: {
      id: true,
      userId: true,
      targetUser: true,
    },
  });

  if (getUserBookmarkStatus === null && userId !== targetUser) {
    await client.userBookmarks.create({
      data: {
        userId,
        targetUser,
      },
    });

    isBookmarked = true;
  } else if (userId === targetUser) {
    throw new BookmarkSelfError();
  } else {
    await client.userBookmarks.delete({
      where: {
        id: getUserBookmarkStatus?.id,
      },
    });

    isBookmarked = false;
  }

  return res.status(200).json(formatAPIResponse({ data: { bookmarked: isBookmarked } }));
});
