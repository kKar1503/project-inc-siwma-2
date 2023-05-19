import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
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

const updateReportSchema = z.object({
  // validates against ReasonType enum from zod
  reason: z.nativeEnum(ReasonType),
});

const userIdSchema = z.object({
  id: z.string().uuid(),
});

// -- Helper functions --
export function formatGetReportResponse(report: UserReports) {
  // destructure report
  const { id, user, reporter, reason, createdAt } = report;

  // construct the result
  const result: ReportResponse = {
    id,
    user,
    reporter,
    reason,
    createdAt,
  };

  return result;
}

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

      res
        .status(200)
        .json(formatAPIResponse(reports.map((report) => formatGetReportResponse(report))));
    }
  )
  .post(async (req, res) => {
    // post user report
    // success 201 response returns reportId
    // endpoint refers to reportee's id and reporter's id grab from auth cookie
    // request body "reason" : "string reason for report"

    const { id: reporteeId } = userIdSchema.parse(req.query);
    const reporterId = req.token?.user.id;
    const { reason } = updateReportSchema.parse(req.body);

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

// get call returns all reports from user with specific id, if no reports are found, returns empty array
