import { apiHandler, formatAPIResponse } from '@/utils/api';
import { DataType } from '@inc/db-enums';

export default apiHandler().get(async (req, res) => {
  // Retrieve all parameter data types from the database
  const dataTypes = await Object.keys(DataType);

  // Return the result
  res.status(200).json(formatAPIResponse(dataTypes));
});
