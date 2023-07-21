import { apiHandler, formatAPIResponse, parseArray, parseToNumber } from '@/utils/api';
import PrismaClient, { Parameter } from '@inc/db';
import { ParameterType } from '@inc/db-enums';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { ParamSizeError } from '@inc/errors';
import { paramSchema, ParamsRequestBody } from '@/utils/api/server/zod';
import { ParameterResponseBody } from '@/utils/api/client/zod';

// -- Helper functions -- //
export function formatParamResponse(
  $parameters:
    | Omit<Parameter, 'createdAt' | 'updatedAt'>
    | Omit<Parameter, 'createdAt' | 'updatedAt'>[]
) {
  // Initialise the parameters array
  let parameters = $parameters;

  // Check if the parameter is not an array
  if (!Array.isArray(parameters)) {
    // Make it an array
    parameters = [parameters];
  }

  // Construct the result
  const result: ParameterResponseBody[] = parameters.map((parameter) => ({
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
 * Constructs the query options to be used in the Prisma query
 */
function buildQueryOptions({ ids, isAdmin }: { ids: number[] | undefined; isAdmin: boolean }) {
  // Construct base query options
  const queryOptions = {
    where: {
      active: true,
      id: {
        in: ids,
      },
    },
    select: {
      id: true,
      name: true,
      displayName: true,
      type: true,
      dataType: true,
      options: true,
      active: true,
    },
  };

  // Add additional query options if the user is not an admin
  if (!isAdmin) {
    queryOptions.where = {
      ...queryOptions.where,
      active: true,
    };

    queryOptions.select.active = false;
  }

  return queryOptions;
}

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

    // Construct query options
    const queryOptions = buildQueryOptions({ ids, isAdmin: req.token?.user.permissions === 1 });

    // Retrieve all parameters from the database
    const parameters = await PrismaClient.parameter.findMany(queryOptions);

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
      const data = paramSchema.post.body.parse(req.body);

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
