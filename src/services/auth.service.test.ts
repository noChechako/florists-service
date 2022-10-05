import {expect, test} from '@jest/globals';
import {login} from './auth.service';
import {Response, Request} from 'express';
import {User} from '../models';
import jwt from 'jsonwebtoken';

const mockAccessToken = {accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMTIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2NjQ3OTQ2NDMsImV4cCI6MTY2NDc5NTg0M30.UdETDmIqA1Yaf5n6aaQjM61YtxDVBP7w0M7hgiwzUkk'};

beforeEach(() => {
    jest.useFakeTimers();
});

const mockReqBody = {
    username: 'testUsername',
    password: 'testPassword'
};

const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(JSON.stringify(mockAccessToken));
    return res;
};


test('Get access token', async () => {
    const next = jest.fn();
    jest.spyOn(User, 'findOne').mockImplementation(() => ({} as any));
    jest.spyOn(jwt, 'sign').mockImplementation(() => mockAccessToken);

    const result = await login({
        body: mockReqBody
    } as Request, mockResponse() as Response, next);

    expect(User.findOne).toHaveBeenCalledWith(mockReqBody);
    expect(result).toBe(JSON.stringify(mockAccessToken));
});

test('User not found. Throw exception', async () => {
    const next = jest.fn();
    jest.spyOn(User, 'findOne').mockImplementation(() => null);
    jest.spyOn(jwt, 'sign').mockImplementation(() => mockAccessToken);

    await login({
        body: mockReqBody
    } as Request, mockResponse() as Response, next);

    expect(User.findOne).toHaveBeenCalledWith(mockReqBody);
    expect(next).toHaveBeenCalledTimes(1);
});
