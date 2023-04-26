import get from 'lodash/get';
import set from 'lodash/set';
import has from 'lodash/has';
import { PrepScope } from '../types/submission';
export default async (scope: PrepScope) => {
    // Check if they do not provide a password in the save, but one exists in the current record.
    // Do not allow them to wipe out their password by saving data that does not include one.
    const { type, component, row, current, path, data } = scope;
    if (
        component.type === 'password' && 
        type === 'save' &&
        !has(row, component.key) &&
        has(current, `data.${path}`)
    ) {
        set(data, path, get(current.data, path));
    }
};