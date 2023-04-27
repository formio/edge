import set from 'lodash/set';
import { PrepScope } from '@formio/appserver-types';
export default async (scope: PrepScope) => {
    const { component, data, value, path } = scope;
    if (!value) {
        return;
    }
    if (
        !component.hasOwnProperty('protected') || 
        !component.protected
    ) {
        // Passwords are always protected.
        if (component.type !== 'password') {
            set(data, path, value);
        }
    }
};