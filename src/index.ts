import express from 'express';
import {connectDatabase} from './repositories/connect-database';
import userRouter from './controllers/user-controller';
import authRouter from './controllers/auth-controller';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from '../swagger.json';
import {errorMiddleware} from './middlewares/error-handler';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDatabase();

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use(errorMiddleware);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc)
);

app.listen(process.env.EXTERNAL_PORT || 3000, () => console.log(`Server up at http://localhost:${process.env.EXTERNAL_PORT || 3000}`));