import {apiHandler} from '@/utils/api';
import {NextApiRequest, NextApiResponse} from "next";

const GET = async (req: NextApiRequest, res: NextApiResponse) => {

}

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {

}

const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {

}

export default apiHandler()
    .get(GET)
    .put(PUT)
    .delete(DELETE);
