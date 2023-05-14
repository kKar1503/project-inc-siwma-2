import { ParamError, ParamInvalidError } from '@inc/errors';

/**
 * Parse a string to a number
 * @param string The string to parse
 * @returns The parsed number
 */
const parseToNumber = (string: string, key?: string) => {
  // Attempt to parse from string to a number
  const result = Number(string);

  // Check if the parsing was successful
  if (string.length === 0 || Number.isNaN(result)) {
    if (key) {
      throw new ParamInvalidError(key, string);
    } else {
      throw new ParamError();
    }
  }

  return result;
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

export { parseToNumber, parseArray, formatAPIResponse };