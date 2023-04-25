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

export default {
  stringToInt,
};
