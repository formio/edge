import { ServerScope } from "./server";

export interface ProjectScope extends ServerScope {
    project: any;
}