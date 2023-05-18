import { apiHandler } from '@/utils/api';
import { z } from 'zod';
import client from '@inc/db';
// import { NotFoundError } from '@inc/errors';

const bulkInviteSchema = z.array(
  z.object({
    mobileNumber: z.string(),
    name: z.string(),
    email: z.string(),
    company: z.string(),
  })
);

export default apiHandler({
  allowAdminsOnly: true,
}).post(async (req, res) => {
  // https://docs.google.com/document/d/1CtwAkM3uPCvJXwlQOZwavxbMG-sa8FkMa3r0ZbnHUlo/edit#heading=h.rq1g0ltfj4ji

  /* NOTE:
   * This endpoint returns an array called "errors".
   * This array contains the invites that failed to be created.
   * The array is empty if all invites were created successfully.
   * On the frontend, you may assume that all invites that aren't returned in the failed array were created successfully.
   */

  const { emails } = req.body;

  const parsedInvites = bulkInviteSchema.parse(emails);

  const existingUsers = await client.users.findMany({
    where: {
      OR: parsedInvites.map((invite) => ({
        email: invite.email,
        mobileNumber: invite.mobileNumber,
      })),
    },
  });

  // Filter out existing users
  const existing = parsedInvites.filter((invite) =>
    existingUsers.find((user) => user.email === invite.email || user.phone === invite.mobileNumber)
  );
  const newUsers = parsedInvites.filter(
    (invite) =>
      !existingUsers.find(
        (user) => user.email === invite.email || user.phone === invite.mobileNumber
      )
  );

  try {
    // Create invites for new users
    const createdInvites = await client.invite.createMany({
      data: newUsers.map((user) => ({
        name: user.name,
        email: user.email,
        companyId: 1, // Replace with actual company ID
        token: '123', // Replace with actual token
        expiry: new Date(), // Replace with actual expiry
        phone: user.mobileNumber,
      })),
    });
  } catch (e) {
    console.log(e);
  }

  return res.status(204).end();
});
