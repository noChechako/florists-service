/**
 * @module auth-service
 */
import User from '../models/user-model';
import {LoginCredentials} from '../models/interfaces/login-interface';
import {NextFunction, Response, Request} from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import UnauthorizedException from '../models/errors/Unauthorized';

dotenv.config();

/**
 * @param req - request
 * @param res - response
 * @param next - next
 * @returns Access token
 * @throws {@link ../models/errors/Unauthorized} if user is `null`
 */
export async function login(req: Request, res: Response, next: NextFunction) {
    const {username, password}: LoginCredentials = req.body;
    const user = await User.findOne({username, password});
    if (user) {
        const accessToken = jwt.sign({
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {expiresIn: '20m'});

        return res.json({
            accessToken,
        });
    } else {
      next(new UnauthorizedException());
    }
}
