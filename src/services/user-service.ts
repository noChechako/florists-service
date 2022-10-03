import User from '../models/user-model';
import {Response, Request, NextFunction} from 'express';
import UserNotFoundException from '../models/errors/User-not-found';

export async function getUser(req: Request, res: Response, next: NextFunction) {
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

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const createdUser = await User.create(req.body);
        return res.status(201).json(createdUser);
    } catch (e) {
        next(e);
    }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const updatedUser = await User.findByIdAndUpdate({_id: req.params.id}, {$set: {...req.body}});
        if (!updatedUser) {
            next(new UserNotFoundException(req.params.id));
        }
        res.status(200).json(updatedUser);
    } catch (e) {
        next(e);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const deletedUser = await User.findByIdAndDelete({_id: req.params.id});
        if (!deletedUser) {
            next(new UserNotFoundException(req.params.id));
        }
        res.status(200).json(deletedUser);
    } catch (e) {
        next(e);
    }
}
