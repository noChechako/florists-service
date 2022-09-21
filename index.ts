import express from 'express';
import {connectDatabase} from "./repositories/connect-database";
import userRouter from './controllers/user-controller'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDatabase();

app.use('/users', userRouter);

// @ts-ignore
app.listen(process.env.EXTERNAL_PORT || 3000, () => console.log(`Server up at http://localhost:${process.env.EXTERNAL_PORT || 3000}`));
