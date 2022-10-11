import * as mongoose from 'mongoose';
import {ROLE} from '../shared/interfaces/user.interface';

const {Schema} = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        minlength: 1,
        maxlength: 40
    },
    password: {
        type: String,
        minlength: 1,
        maxlength: 40
    },
    username: {
        type: String,
        minlength: 1,
        maxlength: 40,
        unique: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER']
    },
});

export interface UserModel extends mongoose.Document{
    email: string;
    username: string;
    password: string;
    role: ROLE;
}

export default mongoose.model<UserModel>('User', UserSchema);
