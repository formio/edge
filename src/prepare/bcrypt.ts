import set from 'lodash/set';
import bcrypt from 'bcryptjs';
import { PrepScope } from '../types/submission';
export default async (scope: PrepScope) => {
    const { component, data, value, path } = scope;
    if (!value) {
        return;
    }
    if (component.type === 'password' && !value.hasOwnProperty('hash')) {
        set(data, path, {hash: bcrypt.hashSync(value, bcrypt.genSaltSync(10))});
    }
};