import { ParamError, ParamInvalidError } from '@/errors';

/**
 * Parse a string to a integer
 * @param string The string to parse
 * @returns The parsed integer
 */
const stringToInt = (string: string, key?: string) => {
  // Attempt to parse from string to int
  const result = parseInt(string, 10);

  // Check if the parsing was successful
  if (Number.isNaN(result)) {
    if (key) {
      throw new ParamInvalidError(key, string);
    } else {
      throw new ParamError();
    }
  }

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

export { stringToInt, formatAPIResponse };
