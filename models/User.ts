import * as mongoose from "mongoose";

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

export default mongoose.model('User', UserSchema);
