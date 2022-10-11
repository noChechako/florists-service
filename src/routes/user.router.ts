import {NextFunction, Request, Response, Router} from 'express';
import {createUser, deleteUser, getUser, updateUser} from '../services/user.service';
import {authenticateJWT} from '../auth/verify-jwt';
import {wrapper} from '../shared/functions/wrapper';

const router = Router();

router
    .get('/:id', authenticateJWT, wrapper(async (req: Request, res: Response, next: NextFunction) => {
        const user = await getUser(req.params.id);
        return res.status(200).json(user);
    }))
    .post('/', authenticateJWT, wrapper(async (req: Request, res: Response, next: NextFunction) => {
        const user = await createUser(req.body);
        return res.status(201).json(user);
    }))
    .put('/:id', authenticateJWT, wrapper(async (req: Request, res: Response, next: NextFunction) => {
        const user = await updateUser(req.params.id, req.body);
        return res.status(200).json(user);
    }))
    .delete('/:id', authenticateJWT, wrapper(async (req: Request, res: Response, next: NextFunction) => {
        const user = await deleteUser(req.params.id);
        return res.status(200).json(user);
    }));

export default router;
