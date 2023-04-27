import get from 'lodash/get';
import bcrypt from './bcrypt';
import access from './access';
import persist from './persist';
import protect from './protect';
import password from './password';
import { PrepScope, Prepper as PrepperType } from '@formio/appserver-types';
export const Preppers = {
    bcrypt,
    access,
    persist,
    protect,
    password
};

const debug = require('debug')('formio:prepare');
const error = require('debug')('formio:error');
export const Prepper: PrepperType = {
    preppers: {
        save: [Preppers.persist, Preppers.access, Preppers.password, Preppers.bcrypt],
        read: [Preppers.protect]
    },
    async prepare(scope: PrepScope) {
        let data = {};
        const { type, form, submission } = scope;
        try {
            debug(`Preparing data for ${form.name}...`);
            await scope.utils.eachComponentData(form.components, submission.data, async (component: any, row: any, path: string) => {
                if (Prepper.preppers.hasOwnProperty(type)) {
                    for (let i = 0; i < (Prepper.preppers as any)[type].length; i++) {
                        await (Prepper.preppers as any)[type][i]({
                            ...scope,
                            component,
                            row,
                            data,
                            value: get(row, component.key),
                            path
                        });
                    }
                }
            });
        }
        catch (err) {
            error(err);
            data = {};
        }
        return data;
    }
};
