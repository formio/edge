import set from 'lodash/set';
import { ProcessScope } from '@formio/appserver-types';
export default async (scope: ProcessScope) => {
    const { component, row } = scope;
    if (!component.calculateValue || !component.calculateServer) {
        return [];
    }
    set(row, component.key, scope.utils.evaluate(component.calculateValue, scope, 'value'));
    return [];
};