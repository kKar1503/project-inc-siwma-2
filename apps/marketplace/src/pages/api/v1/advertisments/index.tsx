import {apiHandler} from '@/utils/api';
import {NextApiRequest, NextApiResponse} from "next";

const POST = async (req: NextApiRequest, res: NextApiResponse) => {

}

const GET = async (req: NextApiRequest, res: NextApiResponse) => {

}

export default apiHandler()
    .post(POST)
    .get(GET);
