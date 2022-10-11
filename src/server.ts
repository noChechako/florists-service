import express from 'express';
import {errorMiddleware} from './middlewares/error-handler.middleware';
import userRouter from './routes/user.router';
import authRouter from './routes/auth.router';
import {connectDatabase} from './infrastructure/connect.database';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from '../swagger.json';
import {httpLoggerMiddleware} from './middlewares/http-logger.middleware';
import {authenticateJWTMiddleware} from './middlewares/auth.middleware';

class Server {
    public server;

    constructor() {
        this.server = express();
        this.persistence();
        this.middlewares();
        this.routes();
        this.openAPI();
    }

    private middlewares() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({extended: true}));
        this.server.use(errorMiddleware);
        this.server.use(httpLoggerMiddleware);
    }

    private routes() {
        this.server.use('/users', userRouter);
        this.server.use('/auth', authRouter);
    }

    private persistence() {
        connectDatabase();
    }

    private openAPI() {
        this.server.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(swaggerJsdoc)
        );
    }
}

export default new Server().server;
