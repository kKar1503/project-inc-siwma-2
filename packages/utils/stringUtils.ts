/**
 * Capitalize the first letter of a string
 * @param text The text to capitalize the first letter of
 * @returns The text with the first letter capitalized
 */
export const capitalizeFirstLetter = (text: string) =>
  // Capitalize the first letter of a string
  text.charAt(0).toUpperCase() + text.slice(1);

/**
 * Joins the elements of an array together into a readable string
 * @example
 * arrayToString(['Red', 'blue', 'green', 'orange'], 'and'); // Returns 'Red, blue, green and orange'
 * @param {(string | number)[]} arr The array to join
 * @param {string} joinWord The word to be used while joining the last word
 * @returns A readable string
 */
export const arrayToString = (arr: (string | number)[], joinWord: string) => {
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
 * Generates a random URL safe string
 * @example
 * generateString(10); // Returns 'aBcDeFgHiJ'
 * generateString(5); // Returns 'aBcDe'
 **/
export function generateString(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

/**
 * Encodes a string to Base64
 *
 * @param randString - Random string to encode
 * @returns Base64 encoded string
 * @example
 * encodeToBase64('hello world') // aGVsbG8gd29ybGQ=
 */
export const encodeToBase64 = (randString: string): string =>
  Buffer.from(randString).toString('base64');

/**
 * Shortens a URL to a random string of entered length
 *
 * @param length - Length of the random string
 * @returns Random string of entered length
 * @example
 * shortenUrl(5) // 3j4k5
 * shortenUrl(10) // 3j4k5l6m7n
 */
export const shortenUrl = (length: number): string => {
  const randomString = generateString(length - 3);
  const base62String = encodeToBase64(randomString).replace(/=/g, '');
  return base62String;
};
