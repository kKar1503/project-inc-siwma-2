import { BaseError, ParamError, ParamInvalidError } from '@inc/errors';
import { z } from 'zod';

/**
 * Parse a string to a number
 * @param string The string to parse
 * @param key The key of the param
 * @param toInt Whether to parse to an integer
 * @returns The parsed number
 */
const parseToNumber = (string: string, key: string | undefined, toInt?: boolean) => {
  // Attempt to parse from string to a number
  const result = Number(string);

  // Check if the result must be an integer
  if (
    string.length !== 0 && // The string is not empty
    !Number.isNaN(result) && // The result is a number
    (toInt === Number.isInteger(result) || !toInt) // The result is an integer if required
  ) {
    // The parsing was successful, return the result
    return result;
  }

  // Parsing unsuccessful
  if (key) {
    throw new ParamInvalidError(key, string);
  } else {
    throw new ParamError();
  }
};

/**
 * Parses a string to a number
 * @param string The string to parse
 * @param ctx The zod error context
 * @param toInt Whether to parse to an integer
 * @returns The parsed number
 */
const zodParseToNumber = (string: string, ctx: z.RefinementCtx, toInt?: boolean) => {
  // Attempt to parse from string to a number
  try {
    const result = parseToNumber(string, String(ctx.path), toInt);
    return result;
  } catch (error) {
    // An error occurred, add to zod error
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      params: {
        response: error,
      },
    });

    return z.NEVER;
  }
};

/**
 * Parses a string to integer
 * @param string The string to parse
 * @param ctx The zod error context
 * @returns The parsed integer
 */
const zodParseToInteger = (string: string, ctx: z.RefinementCtx) =>
  zodParseToNumber(string, ctx, true);

/**
 * Parses a string to boolean
 * @param string The string to parse
 * @param ctx The zod error context
 * @returns The parsed boolean
 */
const zodParseToBoolean = ($string: string, ctx: z.RefinementCtx) => {
  // Convert string to lowercase
  const string = $string.toLowerCase();

  // Check if the string is a boolean value
  if (string !== 'true' && string !== 'false') {
    // No it is not, add to zod error
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      params: {
        response: new ParamInvalidError(String(ctx.path), string, ['true', 'false']),
      },
    });

    return z.NEVER;
  }

  // The string is a boolean value, return the boolean
  return Boolean(string);
};

/**
 * Format the API response into a JSON-API compliant response
 * @param response The response to format
 * @returns A JSON-API compliant response
 */
const formatAPIResponse = (response: object | object[]) => {
  // Check if the response is an array
  if (Array.isArray(response)) {
    // Yes it is, format the response body
    return {
      data: response,
    };
  }

  // The response is not an array, check if it has been formatted properly
  if (Object.prototype.hasOwnProperty.call(response, 'data')) {
    // Yes it has, return the response
    return response;
  }

  // It has not been formatted properly, format the response body
  return {
    data: [response],
  };
};

export { parseToNumber, formatAPIResponse, zodParseToNumber, zodParseToInteger, zodParseToBoolean };
