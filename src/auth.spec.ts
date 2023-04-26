import { Auth } from './auth';
import assert from 'assert';
import { AuthToken } from './types/server';

describe('Auth', () => {
    const user: AuthToken = {
        user: {
            _id: 'test',
            data: {
                firstName: 'Joe',
                lastName: 'Smith',
                email: 'joe@example.com'
            },
            roles: [
                '1234',
                '2468'
            ],
            form: '234234243234234234',
            project: '213312131213212334',
            metadata: {}
        },
        form: {
            _id: '234234243234234234'
        },
        project: {
            _id: '213312131213212334'
        }
    };
    let token = '';
    it('Should return a valid auth token for a valid user', async () => {
        const auth = new Auth();
        token = await auth.token(user, 'test', 240);
        assert(token, 'It must generate a valid token');
    });
    it('Should validate that the token is valid', async () => { 
        const auth = new Auth();
        const tokenUser = await auth.user(token, 'test');
        assert(tokenUser?.iat, 'It must have an iat');
        assert(tokenUser?.exp, 'It must have an exp');
        delete tokenUser?.iat;
        delete tokenUser?.exp;
        assert.deepEqual(tokenUser, user);
    });
    it('Should throw an error with "Bad Token" for an invalid token', async () => {
        const auth = new Auth();
        try {
            await auth.user('invalid', 'test');
        }
        catch (err: any) {
            assert.equal(err.message, 'Bad Token');
        }
    });
    it('Should throw an error with "Token Expired" for an expired token', async () => {
        const auth = new Auth();
        token = await auth.token(user, 'test', 0);
        try {
            await auth.user(token, 'test');
        }
        catch (err: any) {
            assert.equal(err.message, 'Token Expired');
        }
    });
    it('Should throw an error for a token without a secret', async () => {
        const auth = new Auth();
        try {
            await auth.token(user, '');
        }
        catch (err: any) {
            assert.equal(err.message, 'You cannot generate a token without a secret!');
        }
    });
    it('Should throw an error for a token with the wrong secret', async () => {
        const auth = new Auth();
        token = await auth.token(user, 'test', 0);
        try {
            await auth.user(token, '1234');
        }
        catch (err: any) {
            assert.equal(err.message, 'Bad Token');
        }
    });
});