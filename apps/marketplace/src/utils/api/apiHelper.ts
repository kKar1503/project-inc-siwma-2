import { BaseError, ParamError, ParamInvalidError, ParamTypeError } from '@inc/errors';
import { Messages } from '@prisma/client';
import { z } from 'zod';
import { ChatMessage } from './client/zod/chat';

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
 * Zod path to string
 */
const zodPathToString = (path: (string | number)[]) => {
  // Initialise result
  let result = '';

  // Iterate through each path
  for (let i = 0; i < path.length; i++) {
    // Check if it is a number
    if (typeof path[i] === 'number') {
      // It is a number, add it to the result
      result += `[${path[i]}]`;
    } else {
      // It is a string, add it to the result
      result += `${i > 0 ? '.' : ''}${path[i]}`;
    }
  }

  return result;
}

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
    const result = parseToNumber(string, zodPathToString(ctx.path), toInt);
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
        response: new ParamInvalidError(zodPathToString(ctx.path), string, ['true', 'false']),
      },
    });

    return z.NEVER;
  }

  // The string is a boolean value, return the boolean
  return string === 'true';
};

/**
 * Decodes a string to JSON
 * @returns The decoded JSON
 */
const zodDecodeToJson = ($string: unknown, ctx: z.RefinementCtx) => {
  try {
    // Check if the string is a string
    const string = String($string);

    // Decode the URI component
    const value = decodeURIComponent(string);

    // Parse the value to JSON
    const result = JSON.parse(value);
    return result;
  } catch (error) {
    // An error occurred, add to zod error
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      params: {
        response: new ParamTypeError(zodPathToString(ctx.path), 'object', typeof $string),
      },
    });

    return z.NEVER;
  }
};

/**
 * Splits a string up to an array
 * @param string The string to split
 * @returns The split string
 */
const parseArray = (string: string | string[]) => {
  // Check if an array was passed in
  if (Array.isArray(string)) {
    return string;
  }

  // Attempt to split the string into an array
  const result = string.split(',');

  return result;
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

/**
 * Formats a message response object
 * @param message The message to format
 */
export function formatMessageResponse(message: Messages) {
  // Construct base response
  const response: ChatMessage = {
    id: message.id.toString(),
    contentType: message.contentType,
    read: message.read,
    author: message.author,
    createdAt: message.createdAt.toISOString(),
  };

  // Format the message based on the content type
  if (message.contentType !== 'offer') {
    response.content = message.content;
  } else {
    response.offer = message.offer;
  }

  return response;
}

export {
  parseToNumber,
  parseArray,
  formatAPIResponse,
  zodPathToString,
  zodParseToNumber,
  zodParseToInteger,
  zodParseToBoolean,
  zodDecodeToJson,
};
