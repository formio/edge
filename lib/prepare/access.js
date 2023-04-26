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
const find_1 = __importDefault(require("lodash/find"));
const uniq_1 = __importDefault(require("lodash/uniq"));
exports.default = (scope) => __awaiter(void 0, void 0, void 0, function* () {
    const { req, component } = scope;
    let { value } = scope;
    if (!value ||
        !component ||
        !component.key ||
        !(component.submissionAccess || component.defaultPermission)) {
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
    value = (0, uniq_1.default)(value.map((val) => val._id ? val._id.toString() : val.toString()));
    // Iterate through each submissionAccess object and assign the appropriate access roles.
    component.submissionAccess.map((access) => {
        const perm = (0, find_1.default)(req.body.access, {
            type: access.type,
        });
        if (perm) {
            if (!perm.resources) {
                perm.resources = [];
            }
            perm.resources = (0, uniq_1.default)(perm.resources.concat(value));
        }
        else {
            req.body.access.push({
                type: access.type,
                resources: value,
            });
        }
    });
});
