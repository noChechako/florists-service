/**
 * @module user-service
 */
import User from '../models/user.model';
import {Response, Request, NextFunction} from 'express';
import UserNotFoundException from '../shared/errors/user-not-found.exception';

/**
 * @param req - request
 * @param res - response
 * @param next - next
 * @returns The user get from db by id
 * @throws {@link ../models/errors/User-not-found} if user is `null`
 */
export async function getUser(req: Request, res: Response, next: NextFunction): Promise<typeof res> {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            next(new UserNotFoundException(req.params.id));
        }
        return res.status(200).json(user);
    } catch (e) {
        next(e);
    }
}

/**
 * @param req - request
 * @param res - response
 * @param next - next
 * @returns The user, which was created
 */
export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const createdUser = await User.create(req.body);
        return res.status(201).json(createdUser);
    } catch (e) {
        next(e);
    }
}

/**
 * @param req - request
 * @param res - response
 * @param next - next
 * @returns The user, which was updated
 * @throws {@link ../models/errors/User-not-found} if updatedUser is `null`
 */
export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const updatedUser = await User.findByIdAndUpdate({_id: req.params.id}, {$set: {...req.body}});
        if (!updatedUser) {
            next(new UserNotFoundException(req.params.id));
        }
        return res.status(200).json(updatedUser);
    } catch (e) {
        next(e);
    }
}

/**
 * @param req - request
 * @param res - response
 * @param next - next
 * @returns The user, which was deleted
 * @throws {@link ../models/errors/User-not-found} if deletedUser is `null`
 */
export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const deletedUser = await User.findByIdAndDelete({_id: req.params.id});
        if (!deletedUser) {
            next(new UserNotFoundException(req.params.id));
        }
        return res.status(200).json(deletedUser);
    } catch (e) {
        next(e);
    }
}