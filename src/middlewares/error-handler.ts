import {
    NextFunction, Request, Response,
} from 'express';
import {logger} from '../utils/logger';

/**
 * Error middleware
 * @param error - error
 * @param request - request
 * @param response - response
 * @param next - next
 */
export function errorMiddleware(error: any, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    logger.error({status, message});

    response
        .status(status)
        .send({
            status,
            message,
        });

    next();
}
