import {randomBytes} from 'crypto';

const timeLength = 16;
const randomLength = 16;

const getTime = (() => typeof performance !== 'undefined' && typeof performance.now === 'function'
  ? () => performance.timeOrigin + performance.now()
  : () => Date.now())();

const timeBasedHash = async () => {
  let time = getTime().toString(16).replace('.', '');
  time = time.length > timeLength ? time.substring(0, timeLength) : time.padStart(timeLength, '0');

  const random = (await randomBytes(randomLength/2)).toString('hex');

  return `${time}${random}`;
};

export default timeBasedHash;
