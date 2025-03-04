import pino from 'pino';

export const log = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});
