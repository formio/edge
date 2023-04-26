/// <reference types="express" />
import { Auth } from "./auth";
import { Database } from "./db";
export declare const Modules: {
    db: typeof Database;
    auth: typeof Auth;
    process: (scope: import("./types/submission").ProcessScope) => Promise<any>;
    prepare: (scope: import("./types/submission").PrepScope) => Promise<{}>;
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
            mappingComponents(scope: import("./types/action").ActionScope): Promise<any>;
            settingsForm(scope: import("./types/action").ActionScope): Promise<any>;
            saveToForm(scope: import("./types/action").ActionScope, resource: string): undefined;
            childSubmission(scope: import("./types/action").ActionScope, req: import("./types/submission").SubmissionRequest, res: import("./types/submission").SubmissionResponse, submission: any): any;
            childResponse(scope: import("./types/action").ActionScope, req: import("./types/submission").SubmissionRequest, res: import("./types/submission").SubmissionResponse): void;
            executor(scope: import("./types/action").ActionScope): Promise<(req: import("./types/submission").SubmissionRequest, res: import("./types/submission").SubmissionResponse, next: import("express").NextFunction) => Promise<void>>;
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
            settingsForm(scope: import("./types/action").ActionScope): Promise<({
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
            checkAttempts(scope: import("./types/action").ActionScope, error: any, user: import("./types/server").User): Promise<any>;
            executor(scope: import("./types/action").ActionScope): Promise<(req: import("./types/submission").SubmissionRequest, res: import("./types/submission").SubmissionResponse, next: import("express").NextFunction) => Promise<void>>;
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
            settingsForm(scope: import("./types/action").ActionScope): Promise<({
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
            executor(scope: import("./types/action").ActionScope): Promise<(req: import("./types/submission").SubmissionRequest, res: import("./types/submission").SubmissionResponse, next: import("express").NextFunction) => Promise<void | import("./types/submission").SubmissionResponse>>;
        };
    };
};
