import { apiHandler } from "@/utils/api";
import { formatAPIResponse } from "@/utils/stringUtils";
import PrismaClient from "@/utils/prisma";
import { z } from "zod";
import { datatype, parameter, parametertype } from "@prisma/client";

//-- Type definitions --//
// Define the type of the response object
export type ParamResponse = {
  id: string;
  name: string;
  displayName: string;
  type: parametertype;
  datatype: datatype;
  active: boolean;
};

//-- Helper functions --//
export function formatParamResponse($parameters: parameter | parameter[]) {
  // Initialise the parameters array
  let parameters = $parameters;

  // Check if the parameter is not an array
  if (!Array.isArray(parameters)) {
    // Make it an array
    parameters = [parameters];
  }

  // Construct the result
  const result: ParamResponse[] = parameters.map((parameter) => ({
    id: parameter.id.toString(),
    name: parameter.name,
    displayName: parameter.display_name,
    type: parameter.type,
    datatype: parameter.datatype,
    active: parameter.active,
  }));

  return formatAPIResponse(result);
}

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
    res.status(200).json(formatParamResponse(parameters));
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
