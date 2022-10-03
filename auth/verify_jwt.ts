import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import ForbiddenException from '../models/errors/Forbidden';
import UnauthorizedException from '../models/errors/Unauthorized';

dotenv.config();

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        console.log(token)
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err: Error) => {
            if (err) {
                next(new ForbiddenException())
            }
            next();
        });
    } else {
       next(new UnauthorizedException());
    }
}
