import express from 'express';
import {errorMiddleware} from './middlewares/error-handler';
import userRouter from './controllers/user.controller';
import authRouter from './controllers/auth.controller';
import {connectDatabase} from './repositories/connect.database';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from '../swagger-output.json';

class App {
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

export default new App().server;
