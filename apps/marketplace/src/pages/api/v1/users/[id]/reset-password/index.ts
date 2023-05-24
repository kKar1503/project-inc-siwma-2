import { NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError, ForbiddenError, ParamError } from '@inc/errors';
import { APIRequestType } from '@/types/api-types';
import { z } from 'zod';
import { userSchema } from '@/utils/api/server/zod';

// Define the schema for the request body
// const resetPasswordSchema = z.object({
//     newPassword: z.string(),
//     token: z.string(),
// });

// -- Functions --//
/**
 * Resets a user's password
 * @param id The user id
 * @param newPassword The new password
 * @param token The password reset token
 */
const resetPassword = async (req: APIRequestType, res: NextApiResponse) => {
    const { id } = userSchema.userId.parse(req.query);
    console.log(id + "ok")
    const userId = req.token?.user?.id;
    // Validate the request body
    const { newPassword, token } = req.body;
    console.log(token)

    // check if token is valid
    // const userToken = await PrismaClient.userTokens.findUnique({ where: { token } });


    // Check if the user exists
    // const user = await PrismaClient.users.findUnique({ where: { id: uuid } });
    // if (!user) {
    //     throw new NotFoundError(`User with uuid '${uuid}'`);
    // }
    // Reset the password and the reset token
    console.log(newPassword + "adeeb ")
    await PrismaClient.users.update({
        where: { id: id },
        data: {
            password: newPassword,
        },
    });

    res.status(200).json(formatAPIResponse({ message: "Password reset successful." }));
};

export default apiHandler().post(resetPassword);
