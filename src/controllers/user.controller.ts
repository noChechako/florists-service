import {Router} from 'express';
import {createUser, deleteUser, getUser, updateUser} from '../services/user.service';
import {authenticateJWT} from '../auth/verify-jwt';

const router = Router();

router
    .get('/:id', authenticateJWT, getUser)
    .post('/', authenticateJWT, createUser)
    .put('/:id', authenticateJWT, updateUser)
    .delete('/:id', authenticateJWT, deleteUser);

export default router;
