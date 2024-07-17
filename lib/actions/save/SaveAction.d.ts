import { ActionScope, SubmissionRequest, SubmissionResponse } from '@formio/edge-types';
import { NextFunction } from 'express';
export declare const SaveAction: {
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
    mappingComponents(scope: ActionScope): Promise<any>;
    /**
     * The settings form for this action.
     * @param {*} scope
     */
    settingsForm(scope: ActionScope): Promise<any>;
    saveToForm(scope: ActionScope, resource: string): undefined;
    childSubmission(scope: ActionScope, req: SubmissionRequest, res: SubmissionResponse, submission: any): any;
    childResponse(scope: ActionScope, req: SubmissionRequest, res: SubmissionResponse): void;
    executor(scope: ActionScope): Promise<(req: SubmissionRequest, res: SubmissionResponse, next: NextFunction) => Promise<void>>;
};
