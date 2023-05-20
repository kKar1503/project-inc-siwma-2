import { apiHandler, formatAPIResponse } from '@/utils/api';
import { z } from 'zod';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import PrismaClient, { ReasonType, UserReports } from '@inc/db';
import { NotFoundError } from '@inc/errors';

// -- Type Definitions --
// Define the type of the response object
export type PostReportResponse = {
  reportId: string;
};

export type ReportResponse = {
  id: number;
  user: string;
  reporter: string;
  reason: string;
  createdAt: Date;
};

export const updateReportSchema = z.object({
  // validates against ReasonType enum from zod
  reason: z.nativeEnum(ReasonType),
});

export const userIdSchema = z.object({
  id: z.string().uuid(),
});

export default apiHandler()
  .get(
    apiGuardMiddleware({
      allowAdminsOnly: true,
    }),
    //  get user reports protected for admins view only
    async (req, res) => {
      // init user id query params
      const { id } = userIdSchema.parse(req.query);

      // check if id matches uuid type
      const uuid = z.string().uuid().parse(id);

      const reports = await PrismaClient.userReports.findMany({
        where: {
          user: {
            equals: uuid,
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

    const { id: reporteeId } = userIdSchema.parse(req.query);
    const reporterId = req.token?.user.id;
    let { reason } = req.body;

    const regexBreakpoint = /[\s/]/;

    // splits reason string by space or slash and joins with underscore to match db enum
    reason = reason.split(regexBreakpoint).join('_');

    // throws error if reason doesn't match db enum
    if (
      reason !== ReasonType.Offensive_Content_Behaviour &&
      reason !== ReasonType.Cancelling_on_deal &&
      reason !== ReasonType.Suspicious_Account &&
      reason !== ReasonType.Inaccurate_Listings
    ) {
      throw new NotFoundError('Reason');
    }

    // validates against ReasonType enum from zod
    // destructures reason from object body
    ({ reason } = updateReportSchema.parse({ reason }));

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
