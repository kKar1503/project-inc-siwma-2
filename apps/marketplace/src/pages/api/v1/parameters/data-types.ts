import { apiHandler, formatAPIResponse } from '@/utils/api';
import { datatype } from '@inc/db';

export default apiHandler().get(async (req, res) => {
  // Retrieve all parameter data types from the database
  const dataTypes = await Object.keys(datatype);

  // Return the result
  res.status(200).json(formatAPIResponse(dataTypes));
});
