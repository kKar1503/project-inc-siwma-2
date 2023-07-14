import { apiHandler, formatAPIResponse } from '@/utils/api';
import { ParameterType } from '@inc/db';

export default apiHandler().get(async (req, res) => {
  // Retrieve all available parameter types
  const parameterTypes = Object.keys(ParameterType);

  // Return the result
  res.status(200).json(formatAPIResponse(parameterTypes));
});
