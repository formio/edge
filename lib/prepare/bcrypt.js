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
const set_1 = __importDefault(require("lodash/set"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.default = (scope) => __awaiter(void 0, void 0, void 0, function* () {
    const { component, data, value, path } = scope;
    if (!value) {
        return;
    }
    if (component.type === 'password' && !value.hasOwnProperty('hash')) {
        (0, set_1.default)(data, path, { hash: bcryptjs_1.default.hashSync(value, bcryptjs_1.default.genSaltSync(10)) });
    }
});
