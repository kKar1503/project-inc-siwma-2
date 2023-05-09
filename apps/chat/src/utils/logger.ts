import logger from 'pino';
import dayjs from 'dayjs';

export default logger({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});
