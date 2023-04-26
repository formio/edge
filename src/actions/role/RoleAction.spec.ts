import { RoleAction } from './RoleAction';
import assert from 'assert';
describe('RoleAction', () => {
    it('Validate the RoleAction information', () => {
        const info = RoleAction.info;
        assert.equal(info.name, 'role')
        assert.equal(info.title, 'Role Assignment');
    });

    it('TO-DO: Write tests for RoleAction');
});