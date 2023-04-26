import { Request, Response } from 'express';
import { FormScope } from './form';
export interface SubmissionResponse extends Response {
    resource?: any;
    proxyRes: (res: any) => void;
}

export interface SubmissionRequest extends Request {
    user: any;
    token: any;
    scope: any;
    admin: any;
    headers: any;
    childRequests: number;
    skipSave: boolean;
}

export interface SubmissionScope extends FormScope {
    submission: any;
}

export interface ProcessScope extends SubmissionScope {
    component: any;
    row: any;
    value: any;
    data: any;
    req: SubmissionRequest;
    res: SubmissionResponse;
}

export interface PrepScope extends ProcessScope {
    type: string;
    path: string;
    current: any;
}

export interface Mail {
    to: string;
    from: string;
    subject: string;
    text: string;
    html: string;
}