import mongoose from 'mongoose';

export type ROLE = 'USER' | 'ADMIN';

export interface UserResponse {
    _id: string;
    email: string;
    username: string;
    password: string;
    role: ROLE;
}


export interface UserRequest {
    email?: string;
    username?: string;
    password?: string;
    role?: ROLE;
}
