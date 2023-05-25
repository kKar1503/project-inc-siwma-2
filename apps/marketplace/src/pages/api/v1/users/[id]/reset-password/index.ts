import { NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError, ForbiddenError, ParamError } from '@inc/errors';
import { APIRequestType } from '@/types/api-types';
import { userSchema } from '@/utils/api/server/zod';
import bcrypt from 'bcrypt';
import resetPasswordSchema from '@/utils/api/server/zod/users';

// -- Functions --//
/**
 * Resets a user's password
 * @param id The user id
 * @param newPassword The new password
 * @param token The password reset token
 */
const resetPassword = async (req: APIRequestType, res: NextApiResponse) => {
    const { id } = userSchema.userId.parse(req.query);
    const userId = req.token?.user?.id;
    // Validate the request body
    const { newPassword, token } = resetPasswordSchema.resetPassword.post.body.parse(req.body);
    // check if token is valid
    const resetToken = await PrismaClient.passwordReset.findUnique({
        where: { token: token },
    });
    if (!resetToken) {
        throw new ForbiddenError();
    }
    // check if token is expired (token expires after 1 day)
    const tokenDate = new Date(resetToken.createdAt);
    const currentDate = new Date();
    const diff = currentDate.getTime() - tokenDate.getTime();
    const diffInDays = diff / (1000 * 3600 * 24);
    if (diffInDays > 1) {
        throw new ForbiddenError();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // update user password and delete token
    await PrismaClient.$transaction([
        PrismaClient.users.update({
            where: { id: id },
            data: {
                password: hashedPassword,
            },
        }),
        PrismaClient.passwordReset.delete({
            where: { token: token },
        }),
    ]);
    res.status(200).json(formatAPIResponse({ message: 'Password reset successful.' }));
};

export default apiHandler().post(resetPassword);
