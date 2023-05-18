const timeLength = 16;
const randomLength = 16;

const timeBasedHash = async (): Promise<string> => {
  let d = new Date().getTime();
  // use high-precision timer if available
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') d += performance.now();
  let firstHalf = d.toString(16).replace('.', '');
  firstHalf = firstHalf.length > timeLength ? firstHalf.substring(0, timeLength) : firstHalf.padStart(timeLength, '0');

  let lastHalf = '';
  for (let i = 0; i < randomLength; i++) {
    // eslint-disable-next-line no-bitwise
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    // eslint-disable-next-line no-bitwise
    lastHalf += (r & 0x3 | 0x8).toString(16);
  }

  return `${firstHalf}${lastHalf}`;
};
export default timeBasedHash;
