"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modules = void 0;
const auth_1 = require("./auth");
const db_1 = require("./db");
const actions_1 = __importDefault(require("./actions"));
const process_1 = require("./process");
const prepare_1 = require("./prepare");
exports.Modules = {
    db: db_1.Database,
    auth: auth_1.Auth,
    process: process_1.Processor,
    prepare: prepare_1.Prepper,
    actions: actions_1.default
};
