import { NotFoundError } from '@/errors';
import { apiHandler, parseToNumber } from '@/utils/api';
import PrismaClient from '@inc/db';

export default apiHandler({
  allowNonAuthenticated: true,
}).patch(async (req, res) => {
  const { id } = req.query;
  let companyid;
  if (id && typeof id === 'string') {
    companyid = parseToNumber(id);
  }

  const data = await PrismaClient.$queryRaw`
        UPDATE "companies" SET "visibility" = NOT "visibility" WHERE "id" = ${companyid} RETURNING "visibility"
    `;

  if (!data) {
    throw new NotFoundError('company');
  }

  res.status(200).json({ data });
});
