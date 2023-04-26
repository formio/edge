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
const get_1 = __importDefault(require("lodash/get"));
const set_1 = __importDefault(require("lodash/set"));
exports.default = (scope) => __awaiter(void 0, void 0, void 0, function* () {
    // Perform a fetch for data source components.
    const { component, row } = scope;
    if (component.type !== 'datasource' || !(0, get_1.default)(component, 'trigger.server', false)) {
        return [];
    }
    const url = scope.utils.interpolateString((0, get_1.default)(component, 'fetch.url', ''), scope);
    if (!url) {
        return [];
    }
    const request = {
        method: (0, get_1.default)(component, 'fetch.method', 'get').toUpperCase(),
        headers: {}
    };
    (0, get_1.default)(component, 'fetch.headers', []).map((header) => {
        header.value = scope.utils.interpolateString(header.value, scope);
        if (header.value && header.key) {
            request.headers[header.key] = header.value;
        }
        return header;
    });
    if ((0, get_1.default)(component, 'fetch.authenticate', false)) {
        if (scope.req.headers['x-jwt-token']) {
            request.headers['x-jwt-token'] = scope.req.headers['x-jwt-token'];
        }
        if (scope.req.headers['x-remote-token']) {
            request.headers['x-remote-token'] = scope.req.headers['x-remote-token'];
        }
    }
    const body = (0, get_1.default)(component, 'fetch.specifyBody', '');
    if (request.method === 'POST') {
        request.body = JSON.stringify(scope.utils.evaluate(body, scope, 'body'));
    }
    try {
        // Perform the fetch.
        const result = yield (yield scope.utils.fetch(url, request)).json();
        const mapFunction = (0, get_1.default)(component, 'fetch.mapFunction');
        // Set the row data of the fetched value.
        (0, set_1.default)(row, component.key, mapFunction ? scope.utils.evaluate(mapFunction, Object.assign(Object.assign({}, scope), { responseData: result }), 'value') : result);
    }
    catch (err) {
        console.log(err.message);
    }
    return [];
});
