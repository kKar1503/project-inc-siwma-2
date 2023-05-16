import { apiHandler, formatAPIResponse, parseArray, parseToNumber } from '@/utils/api';
import PrismaClient from '@inc/db';
import { z } from 'zod';
import { DataType, Parameter, ParameterType } from '@prisma/client';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { ParamSizeError } from '@inc/errors';

// -- Type definitions -- //
// Define the type of the response object
export type ParamResponse = {
  id: string;
  name: string;
  displayName: string;
  type: ParameterType;
  dataType: DataType;
  active: boolean;
};

// -- Helper functions -- //
export function formatParamResponse($parameters: Parameter | Parameter[]) {
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
    displayName: parameter.displayName,
    type: parameter.type,
    dataType: parameter.dataType,
    active: parameter.active,
    ...(parameter.options.length > 0 && { options: parameter.options }),
  }));

  return formatAPIResponse(result);
}

/**
 * Zod schema for the POST / PUT request body
 */
export const paramsRequestBody = z.object({
  // Define the request body schema
  name: z.string().min(1),
  displayName: z.string().min(1),
  type: z.nativeEnum(ParameterType),
  dataType: z.nativeEnum(DataType),
  options: z.string().array().optional(),
});

export type ParamsRequestBody = z.infer<typeof paramsRequestBody>;

/**
 * Validation functions
 */
export const validateOptions = (data: Pick<ParamsRequestBody, 'type' | 'options'>) => {
  // Ensure that the options array has more than 2 elements if MANY_CHOICES is selected
  if (data.type === ParameterType.MANY_CHOICES && (!data.options || data.options.length <= 2)) {
    throw new ParamSizeError('options', {
      min: 3,
    });
  }

  // Ensure that the options array has 2 elements if TWO_CHOICES is selected
  if (data.type === ParameterType.TWO_CHOICES && (!data.options || data.options.length !== 2)) {
    throw new ParamSizeError('options', {
      exact: 2,
    });
  }

  return true;
};

export default apiHandler()
  .get(async (req, res) => {
    // Obtain  query parameters
    const { id: $ids } = req.query;

    // Initialise query params
    let ids;

    // Check if the ids query parameter is present
    if ($ids) {
      // Yes it is, parse it
      ids = parseArray($ids).map((e) => parseToNumber(e, 'id'));
    }

    // Retrieve all parameters from the database
    const parameters = await PrismaClient.parameter.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // Return the result
    res.status(200).json(formatParamResponse(parameters));
  })
  .post(
    apiGuardMiddleware({
      allowAdminsOnly: true,
    }),
    async (req, res) => {
      // Create a new parameter (admins only)
      // Parse and validate the request body
      const data = paramsRequestBody.parse(req.body);

      // Validate parameter options
      validateOptions(data);

      // Insert the parameter into the database
      const result = await PrismaClient.parameter.create({
        data: {
          ...data,
        },
      });

      // Return the result
      res.status(201).json({ parameterId: result.id });
    }
  );
