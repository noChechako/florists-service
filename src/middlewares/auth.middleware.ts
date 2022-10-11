import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import ForbiddenException from '../shared/errors/forbidden.exception';
import UnauthorizedException from '../shared/errors/unauthorized.exception';
import {getConfig} from '../config/config';

const config = getConfig();

/**
 * @param req - request
 * @param res - response
 * @param next - next
 * @returns Access token
 * @throws {@link ../models/errors/Unauthorized} if authHeader is `null`
 * @throws {@link ../models/errors/Forbidden} if err
 */
export function authenticateJWTMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    console.log(req.originalUrl);
    console.log(['/api-docs/','/login/'].includes(req.originalUrl));
    if(['/api-docs/','/login/'].includes(req.originalUrl)){
        next();
        console.log(44);
        return;
    }

    if (!authHeader) {
        next(new UnauthorizedException());
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.app.jwtSecret, (err: Error) => {
        if (err) {
            next(new ForbiddenException());
        }
        next();
    });
}
