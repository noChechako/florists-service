import {Router} from 'express';
import {NextFunction, Response, Request} from 'express';
import {login} from '../services/auth.service';
import {wrapper} from '../shared/functions/wrapper';

const router = Router();

router
    .post('/login', wrapper(async (req: Request, res: Response, next: NextFunction) => {
        const accessToken = await login(req.body);
        return res.json(accessToken);
    }));


export default router;
