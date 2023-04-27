import { NextFunction } from 'express';
import { ActionScope, User, SubmissionRequest, SubmissionResponse } from '@formio/appserver-types';
export declare const LoginAction: {
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
    /**
     * Format a string to show how long one must wait.
     *
     * @param time - In seconds.
     * @returns {string}
     */
    waitText(time: number): string;
    /**
     * Checks the login attempts for a certain login.
     *
     * @param user
     * @param next
     * @returns {*}
     */
    checkAttempts(scope: ActionScope, error: any, user: User): Promise<any>;
    /**
     * Returns the action middleware.
     *
     * @param {*} scope
     */
    executor(scope: ActionScope): Promise<(req: SubmissionRequest, res: SubmissionResponse, next: NextFunction) => Promise<void>>;
};
