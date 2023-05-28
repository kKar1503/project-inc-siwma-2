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
    BulkInviteEmailRequestBody,
} from '@inc/send-in-blue/templates';
import sendEmails from '@inc/send-in-blue/sendEmails';

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
        content = getContentFor(EmailTemplate.INVITE);
    } catch (e) {
        throw new EmailTemplateNotFoundError();
    }

    const emailBody: BulkInviteEmailRequestBody = {
        htmlContent: content,
        subject: 'Join the SIWMA Marketplace',
        messageVersions: [
            {
                to: [
                    {
                        email,
                        name: 'adeeb',
                    },
                ],
                params: {
                    name: 'adeeb',
                    companyName: 'adeeb',
                    registrationUrl: `${process.env.FRONTEND_URL}/register?token=${tokenHash}`,
                },
            },
        ],
    };

    const emailResponse = await sendEmails(emailBody);

    if (!emailResponse.success) {
        throw emailResponse.error ?? new EmailSendError();
    }

    // Send the newly created password_reset object in the response
    return res.status(201).json(formatAPIResponse({ status: "201", data: passwordReset }));

};

export default apiHandler().post(userForgetPassword);
