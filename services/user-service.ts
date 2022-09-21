import User, {UserResponse} from "../models/user-model";
import {UserCreate, UserUpdate} from "../models/interfaces/user-interface";

export async function getUser(id: string): Promise<UserResponse> {
    return User.findById(id);
};

export async function createUser(user: UserCreate): Promise<UserResponse> {
    return User.create(user);
};

export async function updateUser(id: string, user: UserUpdate): Promise<UserResponse> {
    return User.findByIdAndUpdate({_id: id}, {$set: {...user}})
};

export async function deleteUser(id: string): Promise<any> {
    return User.findByIdAndDelete({_id: id});
};
