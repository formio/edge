"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveAction = void 0;
const each_1 = __importDefault(require("lodash/each"));
const set_1 = __importDefault(require("lodash/set"));
const has_1 = __importDefault(require("lodash/has"));
const get_1 = __importDefault(require("lodash/get"));
const async_1 = __importDefault(require("async"));
const debug = require('debug')('formio:actions:save');
const error = require('debug')('formio:error');
exports.SaveAction = {
    // The action information.
    get info() {
        return {
            name: 'save',
            title: 'Save Submission',
            description: 'Saves the submission into the database.',
            priority: 10,
            defaults: {
                handler: ['before'],
                method: ['create', 'update']
            },
            access: {
                handler: false,
                method: false
            }
        };
    },
    mappingComponents(scope) {
        return __awaiter(this, void 0, void 0, function* () {
            const components = [
                {
                    type: 'select',
                    key: 'mapType',
                    label: 'Request Mapping Type',
                    persist: 'client-only',
                    defaultValue: 'simple',
                    dataSrc: 'values',
                    data: {
                        values: [
                            { label: 'Simple', value: 'simple' },
                            { label: 'Advanced', value: 'advanced' }
                        ]
                    }
                },
                {
                    type: 'panel',
                    title: 'Advanced Request Mapping',
                    key: 'requestMappingPanel',
                    customConditional: `show = row.mapType === 'advanced'`,
                    components: [
                        {
                            input: true,
                            label: "Request Mapping",
                            key: "mapping",
                            placeholder: "/** Example Code **/\nbody = submission;",
                            rows: 8,
                            defaultValue: "",
                            persistent: true,
                            editor: "ace",
                            type: "textarea",
                            description: "Manually perform a mapping of the request being made to the child resource. The 'body' is the req.body sent to the resource. You can use any standard evaluation context variables (form, submission, etc)."
                        }
                    ]
                }
            ];
            for (let key in scope.template.resources) {
                const form = scope.template.resources[key];
                const mappings = {
                    title: 'Simple Mappings',
                    label: 'Simple Mappings',
                    collapsible: false,
                    key: 'mappings',
                    type: 'panel',
                    customConditional: `show = row.mapType === 'simple' && row.resource === "${key}"`,
                    components: []
                };
                const toFields = [];
                yield scope.utils.eachComponentAsync(form.components, (component) => {
                    if (['button'].indexOf(component.type) !== -1) {
                        return;
                    }
                    toFields.push({ label: component.label || component.key, value: component.key });
                });
                yield scope.utils.eachComponentAsync(scope.form.components, (component) => {
                    if (['button'].indexOf(component.type) !== -1) {
                        return;
                    }
                    mappings.components.push({
                        type: 'select',
                        key: `fields.${component.key}`,
                        label: component.label,
                        valueProperty: 'value',
                        dataSrc: 'json',
                        data: { json: toFields }
                    });
                });
                components.push(mappings);
            }
            return components;
        });
    },
    /**
     * The settings form for this action.
     * @param {*} scope
     */
    settingsForm(scope) {
        return __awaiter(this, void 0, void 0, function* () {
            const resources = [];
            for (let name in scope.template.resources) {
                resources.push({
                    label: scope.template.resources[name].title,
                    value: name
                });
            }
            return [
                {
                    type: 'select',
                    key: 'resource',
                    label: 'Save submission to',
                    placeholder: 'This form',
                    valueProperty: 'value',
                    dataSrc: 'json',
                    data: {
                        json: resources
                    },
                    required: false
                },
                {
                    type: 'textfield',
                    key: 'property',
                    label: 'Resource Property',
                    placeholder: 'Assign this resource to the following property',
                    customConditional: 'show = row.resource'
                },
                {
                    legend: 'Resource Fields',
                    key: 'resourceFields',
                    type: 'fieldset',
                    label: 'Resource Fields',
                    customConditional: 'show = row.resource',
                    components: [
                        {
                            label: 'Summary',
                            key: 'summary',
                            type: 'well',
                            hideLabel: true,
                            components: [
                                {
                                    label: 'HTML',
                                    content: 'Below are the fields within the selected resource. For each of these fields, select the corresponding field within this form that you wish to map to the selected Resource. Simple mappings may be used for any component that is not nested within a container, editgrid, datagrid or other nested data component.',
                                    refreshOnChange: false,
                                    attrs: [{ attr: 'style', value: 'margin: 0' }],
                                    key: 'html',
                                    type: 'htmlelement'
                                }
                            ]
                        }
                    ].concat(yield exports.SaveAction.mappingComponents(scope))
                },
                {
                    type: 'panel',
                    title: 'Transform Mappings',
                    key: 'transformPanel',
                    components: [
                        {
                            input: true,
                            label: "Transform Data",
                            key: "transform",
                            placeholder: "/** Example Code **/\ndata = submission.data;",
                            rows: 8,
                            defaultValue: "",
                            persistent: true,
                            editor: "ace",
                            type: "textarea",
                            description: "Available variables are submission and data (data is already transformed by simple mappings)."
                        }
                    ]
                },
                {
                    type: 'panel',
                    title: 'Response Mapping',
                    key: 'responseMappingPanel',
                    components: [
                        {
                            input: true,
                            label: "Response Mapping",
                            key: "response",
                            placeholder: "/** Example Code **/\nresponse = submission;",
                            rows: 8,
                            defaultValue: "",
                            persistent: true,
                            editor: "ace",
                            type: "textarea",
                            description: "Manually perform a mapping of the response being made back to the client. The 'body' is the res.body sent to the client. You can use any standard evaluation context variables (form, submission, etc)."
                        }
                    ]
                }
            ];
        });
    },
    saveToForm(scope, resource) {
        let saveTo;
        (0, each_1.default)(scope.template.resources, (form) => {
            if (form.key === resource) {
                saveTo = form;
                return false;
            }
        });
        if (!saveTo) {
            (0, each_1.default)(scope.template.forms, (form) => {
                if (form.key === resource) {
                    saveTo = form;
                    return false;
                }
            });
        }
        return saveTo;
    },
    // Create a child submission.
    childSubmission(scope, req, res, submission) {
        const { action } = scope;
        let childSub = { data: {} };
        if (action.settings.mapping) {
            try {
                childSub = scope.utils.evaluate(action.settings.mapping, scope.utils.evalContext(Object.assign(Object.assign({}, scope), { body: req.body }), req, res), 'body');
            }
            catch (err) {
                console.log(`Error in mapping transform: ${err.message}`);
            }
        }
        else {
            (0, each_1.default)(action.settings.fields, function (field, key) {
                if (field === 'data') {
                    (0, set_1.default)(childSub.data, key, submission.data);
                }
                else if ((0, has_1.default)(submission.data, field)) {
                    (0, set_1.default)(childSub.data, key, (0, get_1.default)(submission.data, field));
                }
            });
        }
        childSub.metadata = submission.metadata;
        if (action.settings.transform) {
            try {
                childSub.data = scope.utils.evaluate(action.settings.transform, scope.utils.evalContext(scope, req, res), 'data');
            }
            catch (err) {
                console.log(`Error in submission transform: ${err.message}`);
            }
        }
        return childSub;
    },
    // Set the child response
    childResponse(scope, req, res) {
        var _a, _b;
        const { action } = scope;
        if ((_a = res.resource) === null || _a === void 0 ? void 0 : _a.item) {
            // Set the action in the property.
            if ((_b = action.settings) === null || _b === void 0 ? void 0 : _b.property) {
                (0, set_1.default)(req.body.data, action.settings.property, res.resource.item);
            }
            // Save the reference in the external ids.
            if (req.method === 'POST' && res.resource.item._id) {
                // Save the external resource in the external ids.
                req.body.externalIds = req.body.externalIds || [];
                req.body.externalIds.push({
                    type: 'resource',
                    resource: action.settings.resource,
                    id: res.resource.item._id.toString()
                });
            }
            // Allow for a response mapping.
            if (action.settings.response) {
                try {
                    res.resource.item = scope.utils.evaluate(action.settings.response, scope.utils.evalContext(Object.assign(Object.assign({}, scope), { response: res.resource.item }), req, res), 'response');
                }
                catch (err) {
                    console.log(`Error in mapping transform: ${err.message}`);
                }
            }
        }
    },
    executor(scope) {
        return __awaiter(this, void 0, void 0, function* () {
            const action = scope.action;
            return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                debug('Save Action');
                if (req.skipSave || !req.body || (req.method !== 'POST' && req.method !== 'PUT')) {
                    debug('Skipping save action');
                    return next();
                }
                // If this is saving to another resource, then we need to use those handlers instead.
                if ((_a = action.settings) === null || _a === void 0 ? void 0 : _a.resource) {
                    debug('Saving to resource: ' + action.settings.resource);
                    const saveTo = exports.SaveAction.saveToForm(scope, action.settings.resource);
                    if (saveTo) {
                        if (!saveTo.handlers) {
                            error('Cannot find resource handlers.');
                            return next('Cannot find resource handlers.');
                        }
                        const handlers = req.method === 'PUT' ? saveTo.handlers.update : saveTo.handlers.create;
                        const childReq = scope.utils.childRequest(req);
                        childReq.body = exports.SaveAction.childSubmission(scope, req, res, childReq.body);
                        return async_1.default.series(handlers.map((handler) => async_1.default.apply(handler, childReq, res)), (err) => {
                            if (err) {
                                error(err);
                                return next(err);
                            }
                            // Set the child response based on the response of the subform.
                            exports.SaveAction.childResponse(scope, req, res);
                            next();
                        });
                    }
                }
                // Save the submission.
                req.scope.saveSubmission = true;
                debug('Saving submission');
                return next();
            });
        });
    }
};
