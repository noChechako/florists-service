import morgan from 'morgan';
import {logger} from '../infrastructure/logger';

export const httpLoggerMiddleware = morgan(
    ':method :url :status :response-time ms - :res[content-length]',
    {
      stream: {
        write: (message: string) => logger.info(message.trim()),
      },
    },
);
