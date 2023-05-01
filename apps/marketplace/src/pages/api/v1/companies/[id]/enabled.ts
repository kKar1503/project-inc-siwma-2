import { NotFoundError } from '@/errors';
import { apiHandler, parseToNumber, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseBody = {
  visibility: boolean;
};

export default apiHandler({ allowAdminsOnly: false, allowNonAuthenticated: true }).patch(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    let companyid;
    if (id && typeof id === 'string') {
      companyid = parseToNumber(id);
    }

    const response: ResponseBody = await PrismaClient.$queryRaw`
        UPDATE "companies" SET "visibility" = NOT "visibility" WHERE "id" = ${companyid} RETURNING "visibility"
    `;

    if (Object.keys(response).length === 0) {
      throw new NotFoundError('company');
    }

    res.status(200).json(formatAPIResponse(response));
  }
);
