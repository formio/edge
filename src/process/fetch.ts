import get from 'lodash/get';
import set from 'lodash/set';
import { ProcessScope } from '@formio/appserver-types';
export default async (scope: ProcessScope) => {
    // Perform a fetch for data source components.
    const { component, row } = scope;
    if (component.type !== 'datasource' || !get(component, 'trigger.server', false)) {
        return [];
    }
    const url = scope.utils.interpolateString(get(component, 'fetch.url', ''), scope);
    if (!url) {
        return [];
    }
    const request: any = {
        method: get(component, 'fetch.method', 'get').toUpperCase(),
        headers: {}
    };
    get(component, 'fetch.headers', []).map((header: any) => {
        header.value = scope.utils.interpolateString(header.value, scope);
        if (header.value && header.key) {
            request.headers[header.key] = header.value;
        }
        return header;
    });
    if (get(component, 'fetch.authenticate', false)) {
        if (scope.req.headers['x-jwt-token']) {
            request.headers['x-jwt-token'] = scope.req.headers['x-jwt-token'];
        }
        if (scope.req.headers['x-remote-token']) {
            request.headers['x-remote-token'] = scope.req.headers['x-remote-token'];
        }
    }

    const body = get(component, 'fetch.specifyBody', '');
    if (request.method === 'POST') {
        request.body = JSON.stringify(scope.utils.evaluate(body, scope, 'body'));
    }

    try {
        // Perform the fetch.
        const result = await (await scope.utils.fetch(url, request)).json();
        const mapFunction = get(component, 'fetch.mapFunction');

        // Set the row data of the fetched value.
        set(row, component.key, mapFunction ? scope.utils.evaluate(mapFunction, {
            ...scope, 
            ...{responseData: result}
        }, 'value') : result);
    }
    catch (err: any) {
        console.log(err.message);
    }
    return [];
};