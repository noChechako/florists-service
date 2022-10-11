import {createLogger, format, transports} from 'winston';
import 'winston-daily-rotate-file';

const commonFileRotateOptions = {
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    dirname: 'logs',
    zippedArchive: true,
};

const fileRotateTransportOut = new transports.DailyRotateFile({
    filename: 'florists-out-%DATE%.log',
    ...commonFileRotateOptions,
});

const fileRotateTransportError = new transports.DailyRotateFile({
    filename: 'florists-error-%DATE%.log',
    level: 'error',
    ...commonFileRotateOptions,
});

export const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.align(),
        format.printf(info => `${info.timestamp} - [${info.level.toUpperCase()}]: ${info.message}`),
    ),
    transports: [
        fileRotateTransportOut,
        fileRotateTransportError,
        new transports.Console(),
    ],
});
