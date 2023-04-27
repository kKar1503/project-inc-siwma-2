import {apiHandler, formatAPIResponse} from '@/utils/api';
import {NextApiRequest, NextApiResponse} from "next";
import PrismaClient from '@inc/db';
import {NotFoundError} from '@/errors';
import apiGuardMiddleware from "@/utils/api/server/middlewares/apiGuardMiddleware";

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const reqId = req.query.id as string;
    const id = parseInt(reqId, 10);

    if (Number.isNaN(id)) {
        throw new NotFoundError(`advertisement not found`);
    }

    const advertisement = await PrismaClient.advertisements.findUnique({
        where: {
            id,
        }
    });

    if (!advertisement) {
        throw new NotFoundError(`advertisement not found`);
    }

    res.status(200).json(formatAPIResponse(advertisement));
}

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {

}

const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
    const reqId = req.query.id as string;
    const id = parseInt(reqId, 10);

    if (Number.isNaN(id)) {
        throw new NotFoundError(`advertisement not found`);
    }


    await PrismaClient.advertisements.delete({
        where: {
            id,
        },
    });

    res.status(204).end();
}

export default apiHandler({
    allowAdminsOnly: true,
})
    .get(apiGuardMiddleware({
        allowNonAuthenticated: true,
    }), GET)                   // no need admin    no need auth
    .put(PUT)           // needs admin      needs auth
    .delete(DELETE);    // needs admin      needs auth

