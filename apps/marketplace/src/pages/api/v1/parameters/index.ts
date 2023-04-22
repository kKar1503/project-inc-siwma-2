import { apiHandler } from "@/utils/api";
import { formatAPIResponse } from "@/utils/stringUtils";
import PrismaClient from "@/utils/prisma";
import { z } from "zod";
import { datatype, parametertype } from "@prisma/client";

/**
 * Zod schema for the POST / PUT request body
 */
export const paramsRequestBody = z.object({
  // Define the request body schema
  name: z.string(),
  displayName: z.string(),
  type: z.nativeEnum(parametertype),
  dataType: z.nativeEnum(datatype),
});

export default apiHandler({
  allowNonAuthenticated: true,
})
  .get(async (req, res) => {
    // Retrieve all parameters from the database
    const parameters = await PrismaClient.parameter.findMany();

    // Return the result
    res.status(200).json(formatAPIResponse(parameters));
  })
  .post(async (req, res) => {
    // Create a new parameter
    // Parse and validate the request body
    const data = paramsRequestBody.parse(req.body);

    // Insert the parameter into the database
    const result = await PrismaClient.parameter.create({
      data: {
        name: data.name,
        display_name: data.displayName,
        type: data.type,
        datatype: data.dataType,
      },
    });

    // Return the result
    res.status(201).json({ parameterId: result.id });
  });
