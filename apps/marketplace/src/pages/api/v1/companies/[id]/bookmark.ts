import { NotFoundError, ParamError } from '@inc/errors';
import { apiHandler, parseToNumber, formatAPIResponse } from '@inc/api/api';
import PrismaClient from '@inc/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { CompanyResponseBody } from '@inc/api/api/client/zod';

async function getBookmark(userId: string, companyId: number) {
  return PrismaClient.companiesBookmarks.findFirst({
    where: {
      userId,
      companyId,
    },
  });
}

export default apiHandler().patch(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    throw new ParamError('id');
  }

  let isBookmarked;
  const companyId = parseToNumber(id as string, 'id');
  const userId = req.token?.user.id;
  const bookmark = await getBookmark(userId, companyId);

  if (!bookmark) {
    const response = await PrismaClient.companiesBookmarks.create({
      data: {
        userId,
        companyId,
      },
    });
    isBookmarked = true;
  } else {
    const response = await PrismaClient.companiesBookmarks.delete({
      where: {
        id: bookmark.id,
      },
    });
    isBookmarked = false;
  }
  res.status(200).json(formatAPIResponse({ bookmarked: isBookmarked }));
});
