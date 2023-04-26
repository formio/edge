import jwt from 'jsonwebtoken';
import { AuthModule, AuthToken } from './types/server';
const debug = require('debug')('formio:auth');
const error = require('debug')('formio:error');
export class Auth implements AuthModule {
    async token(user: AuthToken, secret: string, expire: number = 240): Promise<string> {
        user = Object.assign({}, user);
        delete user.iat;
        delete user.exp;
        return new Promise((resolve, reject) => {
            if (!secret) {
                return reject(new Error('You cannot generate a token without a secret!'));
            }
            debug('auth.token()', user);
            jwt.sign(user, secret, {
                expiresIn: expire * 60,
            }, (err: any, signed: string | undefined) => {
                if (err) {
                    error(err);
                    return reject(err);
                }
                resolve(signed || '');
            });
        });
    }

    async user(token: string, secret: string): Promise<AuthToken | null> {
        if (!token) {
            return Promise.resolve(null);
        }
        return new Promise((resolve, reject) => {
            if (!secret) {
                return reject('You cannot authenticate without a JWT Secret!');
            }
            debug('auth.verify()', token);
            jwt.verify(token, secret, (err: any, payload: any) => {
                if (err) {
                    error(err);
                    if (err.name === 'JsonWebTokenError') {
                        return reject({message: 'Bad Token'});
                    }
                    if (err.name === 'TokenExpiredError') {
                        return reject({message: 'Token Expired'});
                    }
                    return reject(err);
                }
                debug('auth.user()', payload);
                resolve(payload);
            });
        });
    }
}
