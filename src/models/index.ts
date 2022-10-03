import User from './user-model';
import {connectDatabase} from '../repositories/connect-database';

connectDatabase();

export {User};
