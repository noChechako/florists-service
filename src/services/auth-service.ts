import User from '../models/user-model';
import {LoginCredentials} from '../models/interfaces/login-interface';
import {NextFunction, Response, Request} from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import UnauthorizedException from '../models/errors/Unauthorized';

dotenv.config();

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const {username, password}: LoginCredentials = req.body;
    const user = await User.findOne({username, password});
    if (user) {
        const accessToken = jwt.sign({
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {expiresIn: '20m'});

        await res.json({
            accessToken,
        });
    } else {
      next(new UnauthorizedException());
    }
}
