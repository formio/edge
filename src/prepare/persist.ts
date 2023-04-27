import set from 'lodash/set';
import { PrepScope } from '@formio/appserver-types';
export default async (scope: PrepScope) => {
    const { component, data, value, path } = scope;
    if (!value) {
        return;
    }
    if (!component.hasOwnProperty('persistent') || component.persistent === 'server' || component.persistent === true) {
        set(data, path, value);
    }
};