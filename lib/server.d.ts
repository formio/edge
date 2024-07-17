import { Server as CoreServer } from '@formio/edge-core';
import { Database, Auth } from "./modules";
import Actions from "./actions";
import { Prepper } from './prepare';
import { edgeScope } from '@formio/edge-types';
export declare const Modules: {
    db: typeof Database;
    auth: typeof Auth;
    processors: ProcessTarget;
    prepper: import("@formio/edge-types").Prepper;
    actions: {
        save: {
            readonly info: {
                name: string;
                title: string;
                description: string;
                priority: number;
                defaults: {
                    handler: string[];
                    method: string[];
                };
                access: {
                    handler: boolean;
                    method: boolean;
                };
            };
            mappingComponents(scope: import("@formio/edge-types").ActionScope): Promise<any>;
            settingsForm(scope: import("@formio/edge-types").ActionScope): Promise<any>;
            saveToForm(scope: import("@formio/edge-types").ActionScope, resource: string): undefined;
            childSubmission(scope: import("@formio/edge-types").ActionScope, req: import("@formio/edge-types").SubmissionRequest, res: import("@formio/edge-types").SubmissionResponse, submission: any): any;
            childResponse(scope: import("@formio/edge-types").ActionScope, req: import("@formio/edge-types").SubmissionRequest, res: import("@formio/edge-types").SubmissionResponse): void;
            executor(scope: import("@formio/edge-types").ActionScope): Promise<(req: import("@formio/edge-types").SubmissionRequest, res: import("@formio/edge-types").SubmissionResponse, next: import("express").NextFunction) => Promise<void>>;
        };
        login: {
            readonly info: {
                name: string;
                title: string;
                description: string;
                priority: number;
                defaults: {
                    handler: string[];
                    method: string[];
                };
                access: {
                    handler: boolean;
                    method: boolean;
                };
            };
            settingsForm(scope: import("@formio/edge-types").ActionScope): Promise<({
                type: string;
                label: string;
                key: string;
                placeholder: string;
                dataSrc: string;
                valueProperty: string;
                data: {
                    json: any;
                };
                multiple: boolean;
                validate: {
                    required: boolean;
                };
                input?: undefined;
                description?: undefined;
                defaultValue?: undefined;
                suffix?: undefined;
            } | {
                type: string;
                input: boolean;
                label: string;
                key: string;
                placeholder: string;
                dataSrc: string;
                valueProperty: string;
                data: {
                    json: any;
                };
                multiple: boolean;
                validate: {
                    required: boolean;
                };
                description?: undefined;
                defaultValue?: undefined;
                suffix?: undefined;
            } | {
                type: string;
                key: string;
                input: boolean;
                label: string;
                description: string;
                defaultValue: string;
                placeholder?: undefined;
                dataSrc?: undefined;
                valueProperty?: undefined;
                data?: undefined;
                multiple?: undefined;
                validate?: undefined;
                suffix?: undefined;
            } | {
                type: string;
                key: string;
                input: boolean;
                label: string;
                description: string;
                defaultValue: string;
                suffix: string;
                placeholder?: undefined;
                dataSrc?: undefined;
                valueProperty?: undefined;
                data?: undefined;
                multiple?: undefined;
                validate?: undefined;
            })[]>;
            waitText(time: number): string;
            checkAttempts(scope: import("@formio/edge-types").ActionScope, error: any, user: import("@formio/edge-types").User): Promise<any>;
            executor(scope: import("@formio/edge-types").ActionScope): Promise<(req: import("@formio/edge-types").SubmissionRequest, res: import("@formio/edge-types").SubmissionResponse, next: import("express").NextFunction) => Promise<void>>;
        };
        role: {
            readonly info: {
                name: string;
                title: string;
                description: string;
                priority: number;
                defaults: {
                    handler: string[];
                    method: string[];
                };
                access: {
                    handler: boolean;
                    method: boolean;
                };
            };
            settingsForm(scope: import("@formio/edge-types").ActionScope): Promise<({
                type: string;
                input: boolean;
                label: string;
                key: string;
                placeholder: string;
                template: string;
                dataSrc: string;
                data: {
                    json: string;
                };
                valueProperty: string;
                multiple: boolean;
                validate: {
                    required: boolean;
                };
            } | {
                type: string;
                input: boolean;
                label: string;
                key: string;
                placeholder: string;
                template: string;
                dataSrc: string;
                data: {
                    json: unknown[];
                };
                valueProperty: string;
                multiple: boolean;
                validate: {
                    required: boolean;
                };
            })[]>;
            executor(scope: import("@formio/edge-types").ActionScope): Promise<(req: import("@formio/edge-types").SubmissionRequest, res: import("@formio/edge-types").SubmissionResponse, next: import("express").NextFunction) => Promise<void | import("@formio/edge-types").SubmissionResponse>>;
        };
    };
};
export declare class Server extends CoreServer {
    constructor(config?: edgeScope);
}
export { Prepper };
export { Database };
export { Auth };
export { Actions };
