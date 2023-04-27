import unset from 'lodash/unset';
import get from 'lodash/get';
import has from 'lodash/has';
import isArray from 'lodash/isArray';
import { ProcessScope } from '@formio/appserver-types';
const shouldUnset = (scope: ProcessScope) => {
    const { form, data, component } = scope;
    const { conditional, customConditional } = component;
    if (customConditional) {
        return !scope.utils.evaluate(customConditional, scope, 'show');
    }
    if (conditional && conditional.json) {
        return !scope.utils.jsonLogic.apply(conditional.json, scope);
    }
    if (conditional && conditional.when) {
        const compData = scope.utils.getComponentData(form.components, data, conditional.when);
        if (compData.component) {
            const compValue: any = get(compData.data, compData.component.key);
            const eq: string = String(conditional.eq);
            const show = String(conditional.show);
            if (compValue && has(compValue, eq)) {
                return String(compValue[eq]) === show;
            }
            if (isArray(compValue) && compValue.map(String).includes(eq)) {
                return show === 'true';
            }
            return (String(compValue) === eq) === (show === 'true');
        }
    }
    return false;
};
export default async (scope: ProcessScope) => {
    const { component, row } = scope;
    if (!component.clearOnHide) {
        return [];
    }
    if (shouldUnset(scope)) {
        unset(row, component.key);
    }
    return [];
};