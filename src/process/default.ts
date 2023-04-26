import set from 'lodash/set';
import has from 'lodash/has';
import { ProcessScope } from '../types/submission';
export default async (scope: ProcessScope) => {
    const { component, row } = scope;
    if (
        has(row, component.key) ||
        !component.defaultValue || 
        !component.customDefaultValue
    ) {
        return [];
    }
    let defaultValue;
    if (component.defaultValue) {
        defaultValue = component.defaultValue;
    }
    else if (component.customDefaultValue) {
        defaultValue = scope.utils.evaluate(component.customDefaultValue, scope, 'value');
    }
    set(row, component.key, defaultValue);
    return [];
};