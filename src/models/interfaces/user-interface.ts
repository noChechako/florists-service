export interface UserCreate {
    email: string;
    username: string;
    password: string;
    role: ROLE;
}

export interface UserUpdate {
    email?: string;
    username?: string;
    password?: string;
    role?: ROLE;
}

export type ROLE = 'USER' | 'ADMIN';
