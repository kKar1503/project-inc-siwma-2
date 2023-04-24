import { ParamError, ParamInvalidError } from '@/errors';

/**
 * Capitalize the first letter of a string
 * @param text The text to capitalize the first letter of
 * @returns The text with the first letter capitalized
 */
const capitalizeFirstLetter = (text: string) => {
  // Capitalize the first letter of a string
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Joins the elements of an array together into a readable string
 * @example
 * arrayToString(['Red', 'blue', 'green', 'orange'], 'and'); // Returns 'Red, blue, green and orange'
 * @param {(string | number)[]} arr The array to join
 * @param {string} joinWord The word to be used while joining the last word
 * @returns A readable string
 */
const arrayToString = (arr: (string | number)[], joinWord: string) => {
  // Remove the last element from the array
  const arrWithoutLast = [...arr];
  const poppedElement = arrWithoutLast.pop();

  // Join up all elements of the array (with the last element already removed)
  let result = arrWithoutLast.join(', ');

  // Join the last element to the array
  result += `, ${joinWord} ${poppedElement}`;

  return result;
};

/**
 * Parse a string to a integer
 * @param string The string to parse
 * @returns The parsed integer
 */
const stringToInt = (string: string, key?: string) => {
  // Attempt to parse from string to int
  const result = parseInt(string);

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
  if (response.hasOwnProperty('data')) {
    // Yes it has, return the response
    return response;
  }

  // It has not been formatted properly, format the response body
  return {
    data: [response],
  };
};

export { capitalizeFirstLetter, arrayToString, stringToInt, formatAPIResponse };
