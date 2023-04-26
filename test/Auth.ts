import { AuthModule, AuthToken } from "../lib/types/server";
export class TestAuth implements AuthModule {
    async token(user: AuthToken, secret: string, expire: number = 240): Promise<string> {
        return 'test123';
    }

    async user(token: string, secret: string): Promise<AuthToken | null> {
        return {
            user: {
                _id: 'test',
                data: {},
                roles: [],
                form: '',
                project: '',
                metadata: {}
            },
            form: {
                _id: ''
            },
            project: {
                _id: ''
            }
        };
    }
}