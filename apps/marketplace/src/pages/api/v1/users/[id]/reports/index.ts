import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';

// -- Type Definitions --
// Define the type of the response object
export type ReportResponse = {
  id: number;
  user: string;
  reporter: string;
  reason: string;
  createdAt: Date;
};

// -- Helper functions --
export function formatGetReportResponse(
  id: number,
  user: string,
  reporter: string,
  reason: string,
  //   eslint complaining about created_at not being in camelCase
  createdAt: Date
) {
  // construct the result
  const result: ReportResponse = {
    id,
    user,
    reporter,
    reason,
    createdAt,
  };

  return formatAPIResponse(result);
}

export default apiHandler()
  .get(
    apiGuardMiddleware({
      allowAdminsOnly: true,
    }),
    //  get user reports protected for admins view only
    async (req, res) => {
      res
        .status(200)
        .json(
          formatGetReportResponse(1, 'user', 'reporter', 'Offensive Content/Behaviour', new Date())
        );
    }
  )
  .post(async (req, res) => {
    // post user report
    // success 201 response returns reportId
    // endpoint refers to reportee's id and reporter's id grab from auth cookie
    // request body "reason" : "string reason for report"
  });

// get call returns all reports from user with specific id, if no reports are found, returns empty array
