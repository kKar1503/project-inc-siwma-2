import { NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError, ForbiddenError, ParamError } from '@inc/errors';
import { APIRequestType } from '@/types/api-types';
import { z } from 'zod';

// Define the schema for the request body
const resetPasswordSchema = z.object({
    newPassword: z.string(),
    token: z.string(),
});

// -- Functions --//
/**
 * Resets a user's password
 * @param id The user id
 * @param newPassword The new password
 * @param token The password reset token
 */
const resetPassword = async (req: APIRequestType, res: NextApiResponse) => {
    const uuid = req.query.uuid as string;
    const userId = req.token?.user?.id;


    // Validate the request body
    const { newPassword, token } = resetPasswordSchema.parse(req.body);

    // Check if the user exists
    const user = await PrismaClient.users.findUnique({ where: { id: uuid } });
    if (!user) {
        throw new NotFoundError(`User with uuid '${uuid}'`);
    }

    // // Validate the reset token
    // if (user.resetToken !== token) {
    //     throw new ForbiddenError();
    // }

    // Reset the password and the reset token
    await PrismaClient.users.update({
        where: { id: uuid },
        data: {
            password: newPassword, // Make sure to hash the password in your actual implementation
        }
    });

    res.status(200).json(formatAPIResponse({ message: "Password reset successful." }));
};

export default apiHandler().post(resetPassword);
