/**
 * @module auth-service
 */
import User from '../models/user.model';
import {LoginOutputToken, LoginPostCredentials} from '../shared/interfaces/login.interface';
import jwt from 'jsonwebtoken';
import UnauthorizedException from '../shared/errors/unauthorized.exception';
import {getConfig} from '../config/config';

const config = getConfig();

/**
 * @param body - LoginCredentials
 * @returns string
 * @throws {@link ../models/errors/Unauthorized} if user is `null`
 */
export async function login(body: LoginPostCredentials): Promise<LoginOutputToken> {
    const {username, password} = body;
    const user = await User.findOne({username, password});

    if (!user) {
        throw new UnauthorizedException();
    }

    const accessToken = jwt.sign({
        username: user.username,
        role: user.role
    }, config.app.jwtSecret, {expiresIn: config.app.jwtMaxAge});

    return {accessToken};
}
