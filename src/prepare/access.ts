import find from 'lodash/find';
import uniq from 'lodash/uniq';
import { PrepScope } from '@formio/appserver-types';
export default async (scope: PrepScope) => {
    const { component, submission } = scope;
    let { value } = scope;
    if (
        !value ||
        !component || 
        !component.key || 
        !(component.submissionAccess || component.defaultPermission)
    ) {
        // Return early if the conditions are not met.
        return;
    }

    // Normalize the submissionAccess property.
    if (!component.submissionAccess) {
        component.submissionAccess = [
            {
                type: component.defaultPermission,
                roles: [],
            },
        ];
    }

    if (!Array.isArray(value)) {
        value = [value];
    }

    if (!value.length) {
        return;
    }

    // Convert the value to an array of ids.
    value = uniq(value.map((val: any) => val._id ? val._id.toString() : val.toString()));

    // Iterate through each submissionAccess object and assign the appropriate access roles.
    component.submissionAccess.map((access: any) => {
        const perm = find(submission.access, {
            type: access.type,
        });
        if (perm) {
            if (!perm.resources) {
                perm.resources = [];
            }
            perm.resources = uniq(perm.resources.concat(value));
        }
        else {
            submission.access.push({
                type: access.type,
                resources: value,
            });
        }
    });
};