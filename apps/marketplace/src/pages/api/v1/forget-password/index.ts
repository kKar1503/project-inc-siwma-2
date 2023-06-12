import { NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import {
    NotFoundError, ForbiddenError, EmailTemplateNotFoundError,
    EmailSendError,
} from '@inc/errors';
import PrismaClient, { Prisma } from '@inc/db';
import { APIRequestType } from '@/types/api-types';
import bcrypt from 'bcrypt';
import {
    getContentFor,
    EmailTemplate,
    ForgetPasswordEmailRequestBody,
} from '@inc/send-in-blue/templates';
import sendEmails from '@inc/send-in-blue/sendEmails';
import forgetPasswordSchema from '@/utils/api/server/zod/users';

const userForgetPassword = async (req: APIRequestType, res: NextApiResponse) => {
    // Get email from request body
    const { email } = forgetPasswordSchema.forgetPassword.post.query.parse(req.body);
    // Check if there is a user associated with the email
    const user = await PrismaClient.users.findUnique({
        where: { email },
    });

    if (!user) {
        return res.status(204).end();
    }

    // Create token: user's name, email, the current date, and a random string
    const tokenString = `${email}${new Date().toISOString()}${Math.random()}`;

    // Use bcrypt to hash the token
    const salt = await bcrypt.genSalt(10);
    const tokenHash = await bcrypt.hash(tokenString, salt);

    // Create a new password_reset object
    const passwordReset = await PrismaClient.passwordReset.create({
        data: {
            token: tokenHash,
            user: user.id,
        },
    });
    let content: string;
    try {
        content = getContentFor(EmailTemplate.FORGETPASSWORD);
    } catch (e) {
        throw new EmailTemplateNotFoundError();
    }

    const emailBody: ForgetPasswordEmailRequestBody = {
        htmlContent: content,
        subject: 'Reset your password',
        messageVersions: [
            {
                to: [
                    {
                        email,
                        name: user.name,
                    },
                ],
                params: {
                    name: user.name,
                    // add tokenHash as query parameter
                    resetUrl: `${process.env.FRONTEND_URL}/reset/${user.id}?token=${tokenHash}`,
                },
            },
        ],
    };



    const emailResponse = await sendEmails(emailBody);

    if (!emailResponse.success) {
        throw emailResponse.error ?? new EmailSendError();
    }

    return res.status(204).end();


};

export default apiHandler().post(userForgetPassword);
