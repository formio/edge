import { SubmissionRequest, SubmissionResponse, ActionScope } from "@formio/edge-types";
import { NextFunction } from "express";
export declare const RoleAction: {
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
    /**
     * The settings form for this action.
     * @param {*} scope
     */
    settingsForm(scope: ActionScope): Promise<({
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
    /**
     * Returns the action middleware.
     *
     * @param {*} scope
     */
    executor(scope: ActionScope): Promise<(req: SubmissionRequest, res: SubmissionResponse, next: NextFunction) => Promise<void | SubmissionResponse>>;
};
