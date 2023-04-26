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
const unset_1 = __importDefault(require("lodash/unset"));
const get_1 = __importDefault(require("lodash/get"));
const has_1 = __importDefault(require("lodash/has"));
const isArray_1 = __importDefault(require("lodash/isArray"));
const shouldUnset = (scope) => {
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
            const compValue = (0, get_1.default)(compData.data, compData.component.key);
            const eq = String(conditional.eq);
            const show = String(conditional.show);
            if (compValue && (0, has_1.default)(compValue, eq)) {
                return String(compValue[eq]) === show;
            }
            if ((0, isArray_1.default)(compValue) && compValue.map(String).includes(eq)) {
                return show === 'true';
            }
            return (String(compValue) === eq) === (show === 'true');
        }
    }
    return false;
};
exports.default = (scope) => __awaiter(void 0, void 0, void 0, function* () {
    const { component, row } = scope;
    if (!component.clearOnHide) {
        return [];
    }
    if (shouldUnset(scope)) {
        (0, unset_1.default)(row, component.key);
    }
    return [];
});
