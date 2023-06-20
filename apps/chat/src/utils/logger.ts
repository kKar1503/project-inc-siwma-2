import logger from 'pino';
import dayjs from 'dayjs';
import { Event } from '@inc/types';
import { Socket } from 'socket.io';

export const eventLogFormatter = (eventName: Event, socket: Socket) =>
  `[${socket.id}:${eventName}]`;

export default logger({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});
