import { apiHandler, formatAPIResponse } from '@/utils/api';
import { CategoryResponseBody } from '@/utils/api/client/zod';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@inc/errors';
import { parseCategoryId } from '..';

export default apiHandler({ allowAdminsOnly: true }).patch(async (req, res) => {
  const { id } = req.query;
  const categoryid = parseCategoryId(id as string, false);

  const response: Pick<CategoryResponseBody, 'active'> = await PrismaClient.$queryRaw`
        UPDATE "category" SET "active" = NOT "active" WHERE "id" = ${categoryid} RETURNING "active"
    `;

  if (Object.keys(response).length === 0) {
    throw new NotFoundError('Category');
  }

  res.status(200).json(formatAPIResponse(response));
});
