import { ParamInvalidError, ParamTypeError } from "@/errors";

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
 * @param {string[] || number[]} arr The array to join
 * @param {string} joinWord The word to be used while joining the last word
 * @returns A readable string
 */
const arrayToString = (arr: string[] | number[], joinWord: string) => {
  // Remove the last element from the array
  const arrWithoutLast = [...arr];
  const poppedElement = arrWithoutLast.pop();

  // Join up all elements of the array (with the last element already removed)
  let result = arrWithoutLast.join(", ");

  // Join the last element to the array
  result += `, ${joinWord} ${poppedElement}`;

  return result;
};

/**
 * Parse a string to a number
 * @param string The string to parse
 * @returns The parsed number
 */
const parseToNumber = (string: string, key?: string) => {
  try {
    const result = Number(string.toString());

    if (Number.isNaN(result)) {
      throw new Error();
    }

    return Number(string.toString());
  } catch (error) {
    // Unable to parse string to number
    if (key) {
      throw new ParamInvalidError(key, string);
    } else {
      throw error;
    }
  }
};

export { capitalizeFirstLetter, arrayToString, parseToNumber };
