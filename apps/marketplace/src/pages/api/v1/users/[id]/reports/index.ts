import { apiHandler, formatAPIResponse } from '@/utils/api';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { usersSchema } from '@/utils/api/server/zod';
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
      const { id } = usersSchema.userId.parse(req.query);

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

    const { id: reporteeId } = usersSchema.userId.parse(req.query);
    const reporterId = req.token?.user.id;
    const { reason: $reason } = req.body;

    const regexBreakpoint = /[\s/]/;

    // splits reason string by space or slash and joins with underscore to match db enum
    const reason = $reason.split(regexBreakpoint).join('_');

    // validates against ReasonType enum from zod
    // destructures reason from object body
    const parsedReason = usersSchema.report.post.body.parse(reason);

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
        reason: parsedReason,
      },
    });

    res.status(201).json(formatAPIResponse({ reportId: postReport.id }));
  });
