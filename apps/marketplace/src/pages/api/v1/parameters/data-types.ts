import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { DataType } from '@inc/db';

export default apiHandler().get(async (req: NextApiRequest, res: NextApiResponse) => {
  // Retrieve all parameter data types from the database
  const dataTypes = await Object.keys(DataType);

  // Return the result
  res.status(200).json(formatAPIResponse(dataTypes));
});
