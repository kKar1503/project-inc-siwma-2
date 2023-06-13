import { apiHandler, formatAPIResponse, parseToNumber } from '@inc/api/api';
import { CategoryResponseBody } from '@inc/api/api/client/zod';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@inc/errors';

export default apiHandler({ allowAdminsOnly: true }).patch(async (req, res) => {
  const { id } = req.query;
  const categoryid = parseToNumber(id as string, 'id');

  const response: Pick<CategoryResponseBody, 'active'> = await PrismaClient.$queryRaw`
        UPDATE "category" SET "active" = NOT "active" WHERE "id" = ${categoryid} RETURNING "active"
    `;

  if (Object.keys(response).length === 0) {
    throw new NotFoundError('Category');
  }

  res.status(200).json(formatAPIResponse(response));
});
