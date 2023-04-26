import { SaveAction } from './SaveAction';
import assert from 'assert';
describe('SaveAction', () => {
    it('Validate the SaveAction information', () => {
        const info = SaveAction.info;
        assert.equal(info.name, 'save')
        assert.equal(info.title, 'Save Submission');
    });

    it('TO-DO: Write tests for SaveAction');
});