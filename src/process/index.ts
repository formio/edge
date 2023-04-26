import get from 'lodash/get';
import fetch from './fetch';
import calculate from './calculate';
import conditions from './conditions';
import validate from './validate';
import { ProcessScope } from '../types/submission';
export const Proccessors = {
    fetch,
    calculate,
    conditions,
    validate
};
export const PreProccessors = [
    Proccessors.fetch,
    Proccessors.calculate,
    Proccessors.conditions,
    Proccessors.validate
];

const debug = require('debug')('formio:process');
const error = require('debug')('formio:error');
export const Processor = async (scope: ProcessScope) => {
    let errors: any = [];
    const { form, submission } = scope;
    try {
        debug(`Processing data for ${form.name}...`);
        await scope.utils.eachComponentData(form.components, submission.data, async (component: any, row: any, path: string) => {
            const value = get(row, component.key);
            const processScope = {...scope, ...{ row, component, value, path }};
            for (let i = 0; i < PreProccessors.length; i++) {
                await PreProccessors[i](processScope);
            }
        });
    }
    catch (err: any) {
        error(err);
        errors = [
            { message: err.message }
        ];
    }
    return errors;
};
