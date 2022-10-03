import {Router} from 'express';
import {createUser, deleteUser, getUser, updateUser} from '../services/user-service';
import {authenticateJWT} from '../auth/verify_jwt';

const router = Router();

router
    .get('/:id', authenticateJWT, getUser)
    .post('/', createUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

export default router;
