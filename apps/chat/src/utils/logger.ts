import pino from 'pino';
import dayjs from 'dayjs';
import { Event } from '@inc/types';
import { Socket } from 'socket.io';

export type LogLevels = 'trace' | 'debug' | 'info' | 'event' | 'warn' | 'error' | 'fatal';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  customLevels: {
    event: 35,
  },
  level: process.env.LOG_LEVEL || 'debug',
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export const eventLogHelper = (eventName: Event, socket: Socket) => {
  logger.event(`[${socket.id}:${eventName}]`);
  return (level: LogLevels, logMessage: string) =>
    logger[level](`[${socket.id}:${eventName}] ${logMessage}`);
};

export default logger;
