import {apiHandler, formatAPIResponse} from '@/utils/api';
import {NextApiRequest, NextApiResponse} from "next";
import PrismaClient from '@inc/db';
const POST = async (req: NextApiRequest, res: NextApiResponse) => {

}

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const advertisements = await PrismaClient.advertisements.findMany();
    res.status(200).json(formatAPIResponse(advertisements));
}

export default apiHandler()
    .post(POST)
    .get(GET);
