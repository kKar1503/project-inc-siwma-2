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
