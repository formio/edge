import { LoginAction } from './LoginAction';
import assert from 'assert';
describe('LoginAction', () => {
    it('Validate the LoginAction information', () => {
        const info = LoginAction.info;
        assert.equal(info.name, 'login')
        assert.equal(info.title, 'Login');
    });

    it('TO-DO: Write tests for LoginAction');
});