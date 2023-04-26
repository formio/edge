import get from 'lodash/get';
import bcrypt from './bcrypt';
import access from './access';
import persist from './persist';
import protect from './protect';
import password from './password';
import { PrepScope } from '../types/submission';
export const Preppers = {
    bcrypt,
    access,
    persist,
    protect,
    password
};

export const MethodPreppers: any = {
    save: [Preppers.persist, Preppers.access, Preppers.password, Preppers.bcrypt],
    read: [Preppers.protect]
};

const debug = require('debug')('formio:prepare');
const error = require('debug')('formio:error');
export const Prepper = async (scope: PrepScope) => {
    let data = {};
    const { type, form, submission } = scope;
    try {
        debug(`Preparing data for ${form.name}...`);
        await scope.utils.eachComponentData(form.components, submission.data, async (component: any, row: any, path: string) => {
            for (let i = 0; i < MethodPreppers[type].length; i++) {
                await MethodPreppers[type][i]({
                    ...scope,
                    component,
                    row,
                    data,
                    value: get(row, component.key),
                    path
                });
            }
        });
    }
    catch (err) {
        error(err);
        data = {};
    }
    return data;
};
