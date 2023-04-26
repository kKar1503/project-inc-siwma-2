import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@/utils/prisma';

export default apiHandler().get(async (req, res) => {
  // Retrieve all parameter choices from the database
  const parameterChoices = await PrismaClient.parameter_choices.findMany();

  // Return the result
  res.status(200).json(formatAPIResponse(parameterChoices));
});
