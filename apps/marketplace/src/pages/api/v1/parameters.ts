import { apiHandler } from "@/utils/api";
import { formatAPIResponse } from "@/utils/stringUtils";
import PrismaClient from "@/utils/prisma";
import { z } from "zod";

/**
 * Zod schema for the POST request body
 */
export const paramsPostRequest = z.object({
  // Define the request body schema
  name: z.string(),
  displayName: z.string(),
  type: z.string(),
  dataType: z.string(),
});

export default apiHandler({
  allowNonAuthenticated: true,
}).get(async (req, res) => {
  // Retrieve all parameters from the database
  const parameters = await PrismaClient.parameter.findMany();

  // Return the result
  res.status(201).json(formatAPIResponse(parameters));
});
