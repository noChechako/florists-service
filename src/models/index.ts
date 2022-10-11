import User from './user.model';
import {connectDatabase} from '../infrastructure/connect.database';

connectDatabase();

export {User};
