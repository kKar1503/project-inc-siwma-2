import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler().get(async (req: NextApiRequest, res: NextApiResponse) => {
  // Retrieve all parameter choices from the database
  const parameterChoices = await PrismaClient.parameterChoices.findMany();

  // Return the result
  res.status(200).json(formatAPIResponse(parameterChoices));
});
