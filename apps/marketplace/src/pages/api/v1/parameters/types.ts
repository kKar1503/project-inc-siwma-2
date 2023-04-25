import { apiHandler } from '@/utils/api';
import { formatAPIResponse } from '@/utils/stringUtils';
import { parametertype } from '@prisma/client';

export default apiHandler().get(async (req, res) => {
  // Retrieve all available parameter types
  const parameterTypes = Object.keys(parametertype);

  // Return the result
  res.status(200).json(formatAPIResponse(parameterTypes));
});
