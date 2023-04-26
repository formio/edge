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
exports.Processor = exports.PreProccessors = exports.Proccessors = void 0;
const get_1 = __importDefault(require("lodash/get"));
const fetch_1 = __importDefault(require("./fetch"));
const calculate_1 = __importDefault(require("./calculate"));
const conditions_1 = __importDefault(require("./conditions"));
const validate_1 = __importDefault(require("./validate"));
exports.Proccessors = {
    fetch: fetch_1.default,
    calculate: calculate_1.default,
    conditions: conditions_1.default,
    validate: validate_1.default
};
exports.PreProccessors = [
    exports.Proccessors.fetch,
    exports.Proccessors.calculate,
    exports.Proccessors.conditions,
    exports.Proccessors.validate
];
const debug = require('debug')('formio:process');
const error = require('debug')('formio:error');
const Processor = (scope) => __awaiter(void 0, void 0, void 0, function* () {
    let errors = [];
    const { form, submission } = scope;
    try {
        debug(`Processing data for ${form.name}...`);
        yield scope.utils.eachComponentData(form.components, submission.data, (component, row, path) => __awaiter(void 0, void 0, void 0, function* () {
            const value = (0, get_1.default)(row, component.key);
            const processScope = Object.assign(Object.assign({}, scope), { row, component, value, path });
            for (let i = 0; i < exports.PreProccessors.length; i++) {
                yield exports.PreProccessors[i](processScope);
            }
        }));
    }
    catch (err) {
        error(err);
        errors = [
            { message: err.message }
        ];
    }
    return errors;
});
exports.Processor = Processor;
