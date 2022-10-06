/**
 * @module auth-service
 */
import User from '../models/user.model';
import {LoginCredentials} from '../shared/interfaces/login.interface';
import {NextFunction, Response, Request} from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import UnauthorizedException from '../shared/errors/unauthorized.exception';

dotenv.config();

/**
 * @param req - request
 * @param res - response
 * @param next - next
 * @returns Access token
 * @throws {@link ../models/errors/Unauthorized} if user is `null`
 */
export async function login(req: Request, res: Response, next: NextFunction) {
    /*
        #swagger.description = 'Some description...'
        #swagger.summary = 'Some summary...'
        #swagger.tags = ['Auth']
        #swagger.requestBody = {
              required: true,
              schema: { $ref: "#/components/schemas/UserAuth" }
             }
        #swagger.responses[200] = {
            description: "Access Token",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/AccessToken"
                    }
                }
            }
        }
    */
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
