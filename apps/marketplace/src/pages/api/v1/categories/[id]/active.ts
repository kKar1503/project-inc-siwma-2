import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@/errors';

type ResponseBody = {
  active: boolean;
};

export default apiHandler({ allowAdminsOnly: true }).patch(async (req, res) => {
  const { id } = req.query;
  const categoryid = parseToNumber(id as string);

  const response: ResponseBody = await PrismaClient.$queryRaw`
        UPDATE "category" SET "active" = NOT "active" WHERE "id" = ${categoryid} RETURNING "active"
    `;

  if (Object.keys(response).length === 0) {
    throw new NotFoundError('Category');
  }

  res.status(200).json(formatAPIResponse(response));
});
