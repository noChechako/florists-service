import {describe, expect, test} from '@jest/globals';
import {createUser, deleteUser, getUser, updateUser} from '../user.service';
import {User} from '../../models';
import {UserRequest} from '../../shared/interfaces/user.interface';
import UserNotFoundException from '../../shared/errors/user-not-found.exception';

const mockBodyRequest = {
    email: 'admin@mail.ru',
    password: '123456',
    username: 'admin',
    role: 'ADMIN'
};

const mockBodyResponse = {
    _id: '632add196a27c57f3ecf1ab2',
    email: 'admin@mail.ru',
    password: '123456',
    username: 'admin',
    role: 'ADMIN'
};

const mockIdParam = '632add196a27c57f3ecf1ab2';

describe('Success', () => {
    test('Get user', async () => {
        jest.spyOn(User, 'findById').mockImplementation(() => (mockBodyResponse as any));

        const result = await getUser(mockIdParam);

        expect(User.findById).toHaveBeenCalledWith(mockIdParam);
        expect(JSON.stringify(result)).toBe(JSON.stringify({...mockBodyResponse}));
    });

    test('Create user', async () => {
        jest.spyOn(User, 'create').mockImplementation(() => (mockBodyResponse as any));

        const result = await createUser(mockBodyRequest as UserRequest);

        expect(User.create).toHaveBeenCalledWith(mockBodyRequest);
        expect(JSON.stringify(result)).toBe(JSON.stringify({...mockBodyResponse}));
    });


    test('Update user', async () => {
        jest.spyOn(User, 'findByIdAndUpdate').mockImplementation(() => (mockBodyResponse as any));

        const result = await updateUser(mockIdParam, mockBodyRequest as UserRequest);

        expect(User.findByIdAndUpdate).toHaveBeenCalledWith({'_id': mockIdParam}, {'$set': {...mockBodyRequest}});
        expect(JSON.stringify(result)).toBe(JSON.stringify({...mockBodyResponse}));
    });


    test('Delete user', async () => {
        jest.spyOn(User, 'findByIdAndDelete').mockImplementation(() => (mockBodyResponse as any));

        const result = await deleteUser(mockIdParam);

        expect(User.findByIdAndDelete).toHaveBeenCalledWith({'_id': mockIdParam});
        expect(JSON.stringify(result)).toBe(JSON.stringify({...mockBodyResponse}));
    });
});

describe('Failed', () => {
    test('Get user. User not found', async () => {
        jest.spyOn(User, 'findById').mockImplementation(() => null);

        await expect(() => getUser(mockIdParam)).rejects.toThrow(UserNotFoundException);
    });

    test('Update user. User not found', async () => {
        jest.spyOn(User, 'findByIdAndUpdate').mockImplementation(() => null);

        await expect(() => updateUser(mockIdParam, mockBodyRequest as UserRequest)).rejects.toThrow(UserNotFoundException);

    });

    test('Delete user. User not found', async () => {
        jest.spyOn(User, 'findByIdAndDelete').mockImplementation(() => null);

        await expect(() => deleteUser(mockIdParam)).rejects.toThrow(UserNotFoundException);
    });
});


