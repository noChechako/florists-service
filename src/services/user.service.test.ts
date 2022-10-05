import {describe, expect, test} from '@jest/globals';
import {createUser, deleteUser, getUser, updateUser} from './user.service';
import {User} from '../models';
import {Request, Response} from 'express';

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

const mockReqParams = {
    id: '632add196a27c57f3ecf1ab2'
};

const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(JSON.stringify({...mockBodyResponse}));
    return res;
};

describe('Success', () => {
    test('Get user', async () => {
        const next = jest.fn();
        jest.spyOn(User, 'findById').mockImplementation(() => (mockBodyResponse as any));

        const result = await getUser({
            params: {
                ...mockReqParams
            },
        } as unknown as Request, mockResponse() as Response, next);

        expect(User.findById).toHaveBeenCalledWith(mockReqParams.id);
        expect(result).toBe(JSON.stringify({...mockBodyResponse}));
        expect(next).toHaveBeenCalledTimes(0);
    });

    test('Create user', async () => {
        const next = jest.fn();
        jest.spyOn(User, 'create').mockImplementation(() => (mockBodyResponse as any));

        const result = await createUser({
            body: mockBodyRequest,
        } as unknown as Request, mockResponse() as Response, next);

        expect(User.create).toHaveBeenCalledWith(mockBodyRequest);
        expect(result).toBe(JSON.stringify({...mockBodyResponse}));
        expect(next).toHaveBeenCalledTimes(0);
    });


    test('Update user', async () => {
        const next = jest.fn();
        jest.spyOn(User, 'findByIdAndUpdate').mockImplementation(() => (mockBodyResponse as any));

        const result = await updateUser({
            params: {
                ...mockReqParams
            },
            body: mockBodyRequest
        } as unknown as Request, mockResponse() as Response, next);

        expect(User.findByIdAndUpdate).toHaveBeenCalledWith({'_id': mockReqParams.id}, {'$set': {...mockBodyRequest}});
        expect(result).toBe(JSON.stringify({...mockBodyResponse}));
        expect(next).toHaveBeenCalledTimes(0);
    });


    test('Delete user', async () => {
        const next = jest.fn();
        jest.spyOn(User, 'findByIdAndDelete').mockImplementation(() => (mockBodyResponse as any));

        const result = await deleteUser({
            params: {
                ...mockReqParams
            }
        } as unknown as Request, mockResponse() as Response, next);

        expect(User.findByIdAndDelete).toHaveBeenCalledWith({'_id': mockReqParams.id});
        expect(result).toBe(JSON.stringify({...mockBodyResponse}));
        expect(next).toHaveBeenCalledTimes(0);
    });
});

describe('Failed', () => {
    test('Get user. User not found', async () => {
        const next = jest.fn();
        jest.spyOn(User, 'findById').mockImplementation(() => null);

        await getUser({
            params: {
                ...mockReqParams
            },
        } as unknown as Request, mockResponse() as Response, next);

        expect(User.findById).toHaveBeenCalledWith(mockReqParams.id);
        expect(next).toHaveBeenCalledTimes(1);
    });

    test('Update user. User not found', async () => {
        const next = jest.fn();
        jest.spyOn(User, 'findByIdAndUpdate').mockImplementation(() => null);

        await updateUser({
            params: {
                ...mockReqParams
            },
        } as unknown as Request, mockResponse() as Response, next);

        expect(User.findByIdAndUpdate).toHaveBeenCalledWith({'_id': mockReqParams.id}, {'$set': {...mockBodyRequest}});
        expect(next).toHaveBeenCalledTimes(1);
    });

    test('Delete user. User not found', async () => {
        const next = jest.fn();
        jest.spyOn(User, 'findByIdAndDelete').mockImplementation(() => null);

        await deleteUser({
            params: {
                ...mockReqParams
            },
        } as unknown as Request, mockResponse() as Response, next);

        expect(User.findByIdAndDelete).toHaveBeenCalledWith({'_id': mockReqParams.id});
        expect(next).toHaveBeenCalledTimes(1);
    });
});


