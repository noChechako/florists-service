import {Router} from 'express';
import {createUser, deleteUser, getUser, updateUser} from '../services/user-service';

const router = Router();

router
    .get('/:id', async (req, res) => {
        const user = await getUser(req.params.id);
        return res.status(200).json(user);
    })
    .post('/', async (req, res) => {
        const createdUser = await createUser(req.body);
        return res.status(201).json(createdUser);
    })
    .put('/:id', async (req, res) => {
        const updatedUser = await updateUser(req.params.id, req.body);
        return res.status(200).json(updatedUser);

    })
    .delete('/:id', async (req, res) => {
        const deletedUser = await deleteUser(req.params.id);
        return res.status(200).json(deletedUser);
    })

export default router;
