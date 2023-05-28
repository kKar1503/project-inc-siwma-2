import { NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NotFoundError, ForbiddenError } from '@inc/errors';
import PrismaClient, { Prisma } from '@inc/db';
import { APIRequestType } from '@/types/api-types';
// import { v4 as uuidv4 } from 'uuid';

const userForgetPassword = async (req: APIRequestType, res: NextApiResponse) => {
    // Get email from request body
    const { email } = req.body;

    // Check if there is a user associated with the email
    const user = await PrismaClient.users.findUnique({
        where: { email },
    });

    if (!user) {
        // Return 404 error response if email is not found
        return res.status(404).json(formatAPIResponse({ status: "404" }));
    }

    // // Generate a unique token for password reset
    // const token = uuidv4();

    // Create a new password_reset object
    const passwordReset = await PrismaClient.passwordReset.create({
        data: {
            token: 'token',
            user: user.id,
        },
    });

    // Send the newly created password_reset object in the response
    return res.status(201).json(formatAPIResponse({ status: "201", data: passwordReset }));

};

export default apiHandler().post(userForgetPassword);
