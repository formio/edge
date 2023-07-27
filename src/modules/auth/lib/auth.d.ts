import { AuthModule, AuthToken } from '@formio/appserver-types';
export declare class Auth implements AuthModule {
    token(user: AuthToken, secret: string, expire?: number): Promise<string>;
    user(token: string, secret: string): Promise<AuthToken | null>;
}
