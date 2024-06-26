import { apiHandler, formatAPIResponse } from '@/utils/api';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { userSchema } from '@/utils/api/server/zod';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@inc/errors';

export default apiHandler()
  .get(
    apiGuardMiddleware({
      allowAdminsOnly: true,
    }),
    //  get user reports protected for admins view only
    async (req, res) => {
      // init user id query params
      const { id } = userSchema.userId.parse(req.query);

      const reports = await PrismaClient.userReports.findMany({
        where: {
          user: {
            equals: id,
          },
        },
      });

      res.status(200).json(formatAPIResponse(reports.map((report) => report)));
    }
  )
  .post(async (req, res) => {
    // post user report
    // success 201 response returns reportId
    // endpoint refers to reportee's id and reporter's id grab from auth cookie
    // request body "reason" : "string reason for report"

    const { id: reporteeId } = userSchema.userId.parse(req.query);
    const reporterId = req.token?.user.id;
    const { reason } = userSchema.report.post.body.parse(req.body);

    // check if reporteeId matches uuid type
    const reportee = await PrismaClient.users.findUnique({
      where: {
        id: reporteeId,
      },
    });

    if (!reportee) {
      throw new NotFoundError('User');
    }

    const postReport = await PrismaClient.userReports.create({
      data: {
        user: reporteeId,
        reporter: reporterId,
        reason,
      },
    });

    res.status(201).json(formatAPIResponse({ reportId: postReport.id }));
  });
