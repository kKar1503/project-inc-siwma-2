import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { z } from 'zod';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import PrismaClient, { UserReports } from '@inc/db';

// -- Type Definitions --
// Define the type of the response object
export type ReportResponse = {
  id: number;
  user: string;
  reporter: string;
  reason: string;
  createdAt: Date;
};

const userIdSchema = z.object({
  id: z.string(),
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
  });

// get call returns all reports from user with specific id, if no reports are found, returns empty array
