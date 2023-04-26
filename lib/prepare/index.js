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
exports.Prepper = exports.MethodPreppers = exports.Preppers = void 0;
const get_1 = __importDefault(require("lodash/get"));
const bcrypt_1 = __importDefault(require("./bcrypt"));
const access_1 = __importDefault(require("./access"));
const persist_1 = __importDefault(require("./persist"));
const protect_1 = __importDefault(require("./protect"));
const password_1 = __importDefault(require("./password"));
exports.Preppers = {
    bcrypt: bcrypt_1.default,
    access: access_1.default,
    persist: persist_1.default,
    protect: protect_1.default,
    password: password_1.default
};
exports.MethodPreppers = {
    save: [exports.Preppers.persist, exports.Preppers.access, exports.Preppers.password, exports.Preppers.bcrypt],
    read: [exports.Preppers.protect]
};
const debug = require('debug')('formio:prepare');
const error = require('debug')('formio:error');
const Prepper = (scope) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    const { type, form, submission } = scope;
    try {
        debug(`Preparing data for ${form.name}...`);
        yield scope.utils.eachComponentData(form.components, submission.data, (component, row, path) => __awaiter(void 0, void 0, void 0, function* () {
            for (let i = 0; i < exports.MethodPreppers[type].length; i++) {
                yield exports.MethodPreppers[type][i](Object.assign(Object.assign({}, scope), { component,
                    row,
                    data, value: (0, get_1.default)(row, component.key), path }));
            }
        }));
    }
    catch (err) {
        error(err);
        data = {};
    }
    return data;
});
exports.Prepper = Prepper;
