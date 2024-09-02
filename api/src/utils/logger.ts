import pino from 'pino';

const log = pino({
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

export default log;
