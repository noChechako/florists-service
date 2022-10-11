import {expect, test} from '@jest/globals';
import {login} from '../auth.service';
import {User} from '../../models';
import jwt from 'jsonwebtoken';
import UnauthorizedException from '../../shared/errors/unauthorized.exception';

const mockAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMTIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2NjQ3OTQ2NDMsImV4cCI6MTY2NDc5NTg0M30.UdETDmIqA1Yaf5n6aaQjM61YtxDVBP7w0M7hgiwzUkk';

beforeEach(() => {
    jest.useFakeTimers();
});

const mockReqBody = {
    username: 'testUsername',
    password: 'testPassword'
};

test('Get access token', async () => {
    jest.spyOn(User, 'findOne').mockImplementation(() => ({} as any));
    jest.spyOn(jwt, 'sign').mockImplementation(() => mockAccessToken);

    const result = await login(mockReqBody);

    expect(User.findOne).toHaveBeenCalledWith(mockReqBody);

    expect(JSON.stringify(result)).toBe(JSON.stringify({
        accessToken: mockAccessToken
    }));
});

test('User not found. Throw exception', async () => {
    jest.spyOn(User, 'findOne').mockImplementation(() => null);
    jest.spyOn(jwt, 'sign').mockImplementation(() => mockAccessToken);

    await expect(() => login(mockReqBody)).rejects.toThrow(UnauthorizedException);
});
