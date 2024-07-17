import { SubmissionRequest, SubmissionResponse, ActionScope } from "@formio/edge-types";
import { NextFunction } from "express";
const debug = require('debug')('formio:actions:role');
const error = require('debug')('formio:error');
export const RoleAction = {
    // The action information.
    get info() {
        return {
            name: 'role',
            title: 'Role Assignment',
            description: 'Provides the Role Assignment capabilities.',
            priority: 1,
            defaults: {
                handler: ['after'],
                method: ['create']
            },
            access: {
                handler: false,
                method: false
            }
        };
    },

    /**
     * The settings form for this action.
     * @param {*} scope 
     */
    async settingsForm(scope: ActionScope) {
        return [
            {
                type: 'select',
                input: true,
                label: 'Resource Association',
                key: 'association',
                placeholder: 'Select the type of resource to perform role manipulation.',
                template: '<span>{{ item.title }}</span>',
                dataSrc: 'json',
                data: {
                    json: JSON.stringify([
                        {
                            association: 'existing',
                            title: 'Existing Resource'
                        },
                        {
                            association: 'new',
                            title: 'New Resource'
                        }
                    ])
                },
                valueProperty: 'association',
                multiple: false,
                validate: {
                    required: true
                }
            },
            {
                type: 'select',
                input: true,
                label: 'Action Type',
                key: 'type',
                placeholder: 'Select whether this Action will Add or Remove the contained Role.',
                template: '<span>{{ item.title }}</span>',
                dataSrc: 'json',
                data: {
                    json: JSON.stringify([
                        {
                            type: 'add',
                            title: 'Add Role'
                        },
                        {
                            type: 'remove',
                            title: 'Remove Role'
                        }
                    ])
                },
                valueProperty: 'type',
                multiple: false,
                validate: {
                    required: true
                }
            },
            {
                type: 'select',
                input: true,
                label: 'Role',
                key: 'role',
                placeholder: 'Select the Role that this action will Add or Remove.',
                template: '<span>{{ item.title }}</span>',
                dataSrc: 'json',
                data: { json: Object.values(scope.template.roles) },
                valueProperty: '_id',
                multiple: false,
                validate: {
                    required: true
                }
            }
        ]
    },

    /**
     * Returns the action middleware.
     * 
     * @param {*} scope 
     */
    async executor(scope: ActionScope) {
        return async (req: SubmissionRequest, res: SubmissionResponse, next: NextFunction) => {
            debug('Role Action');
            // Check the submission for the submissionId.
            if (scope.action.settings.association !== 'existing' && scope.action.settings.association !== 'new') {
                error('Invalid setting `association` for the RoleAction; expecting `new` or `existing`.');
                return res.status(400).send('Invalid setting `association` for the RoleAction; expecting `new` or `existing`.');
            }
            // Error if operation type is not valid.
            if (!scope.action.settings.type || (scope.action.settings.type !== 'add' && scope.action.settings.type !== 'remove')) {
                error('Invalid setting `type` for the RoleAction; expecting `add` or `remove`.');
                return res.status(400).send('Invalid setting `type` for the RoleAction; expecting `add` or `remove`.');
            }
            // Error if no resource is being returned.
            if (scope.action.settings.association === 'new' && res.hasOwnProperty('resource') && !res.resource.item && scope.action.settings.role) {
                error('Invalid resource was provided for RoleAction association of `new`.');
                return res.status(400).send('Invalid resource was provided for RoleAction association of `new`.');
            }
            // Error if association is existing and valid data was not provided.
            if (scope.action.settings.association === 'existing' && !scope.action.settings.role) {
                error('Missing role for RoleAction association of "existing". Must specify role to assign in action settings or a form component named "role"');
                return res.status(400).send('Missing role for RoleAction association of "existing". Must specify role to assign in action settings or a form component named "role"');
            }
            if (scope.action.settings.association === 'existing' && !res.resource.item) {
                error('Missing submission for RoleAction association of "existing:. Form must have a resource field named "submission".');
                return res.status(400).send('Missing submission for RoleAction association of "existing:. Form must have a resource field named "submission".');
            }

            // Determine the resources based on the current request.
            let resource = res.resource ? (res.resource.item || req.body) : req.body;
            let role = scope.utils.roleId(scope, scope.action.settings.role);

            if (!resource.roles) {
                resource.roles = [];
            }

            const roleIndex = resource.roles.indexOf(role);
            switch (scope.action.settings.type) {
                case 'add':
                    if (roleIndex !== -1) {
                        return next();
                    }
                    resource.roles.push(role);
                    break;
                case 'remove':
                    if (roleIndex === -1) {
                        return next();
                    }
                    resource.roles.slice(roleIndex, 1);
                    break;
            }

            debug('Updating user with roles', resource.roles);

            // Update the user.
            await scope.db.update(scope, resource._id, resource, ['roles']);
            next();
        };
    }
};
