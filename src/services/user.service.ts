/**
 * @module user-service
 */
import User from '../models/user.model';
import UserNotFoundException from '../shared/errors/user-not-found.exception';
import {UserResponse, UserRequest} from '../shared/interfaces/user.interface';

/**
 * @param id - string
 * @returns The user get from db by id
 * @throws {@link ../models/errors/User-not-found} if user is `null`
 */
export async function getUser(id: string): Promise<UserResponse> {
    const user = await User.findById(id);

    if (!user) {
        throw new UserNotFoundException(id);
    }
    return user as UserResponse;
}

/**
 * @param body - UserRequest
 * @returns The user, which was created
 */
export async function createUser(body: UserRequest): Promise<UserResponse> {
    const createdUser = await User.create(body);
    return createdUser as UserResponse;
}

/**
 * @param id - string
 * @param body - UserRequest
 * @returns The user, which was updated
 * @throws {@link ../models/errors/User-not-found} if updatedUser is `null`
 */
export async function updateUser(id: string, body: UserRequest): Promise<UserResponse> {
    const updatedUser = await User.findByIdAndUpdate({_id: id}, {$set: {...body}});

    if (!updatedUser) {
        throw new UserNotFoundException(id);
    }

    return updatedUser as UserResponse;
}

/**
 * @param id - string
 * @returns The user, which was deleted
 * @throws {@link ../models/errors/User-not-found} if deletedUser is `null`
 */
export async function deleteUser(id: string): Promise<UserResponse> {
    const deletedUser = await User.findByIdAndDelete({_id: id});

    if (!deletedUser) {
        throw new UserNotFoundException(id);
    }

    return deletedUser as UserResponse;
}
