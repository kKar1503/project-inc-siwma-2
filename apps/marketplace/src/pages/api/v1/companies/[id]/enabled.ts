import { NotFoundError, ParamError } from '@inc/errors';
import { apiHandler, parseToNumber, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseBody = {
  visibility: boolean;
};

export default apiHandler({ allowAdminsOnly: true }).patch(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    if (!id) {
      throw new ParamError('id');
    }
    const companyid = parseToNumber(id as string, 'id');

    const response: ResponseBody = await PrismaClient.$queryRaw`
        UPDATE "companies" SET "visibility" = NOT "visibility" WHERE "id" = ${companyid} RETURNING "visibility" AS "visible"
    `;

    if (Object.keys(response).length === 0) {
      throw new NotFoundError('Company');
    }

    res.status(200).json(formatAPIResponse(response));
  }
);
