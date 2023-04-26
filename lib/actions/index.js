"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoginAction_1 = require("./login/LoginAction");
const RoleAction_1 = require("./role/RoleAction");
const SaveAction_1 = require("./save/SaveAction");
exports.default = {
    save: SaveAction_1.SaveAction,
    login: LoginAction_1.LoginAction,
    role: RoleAction_1.RoleAction
};
