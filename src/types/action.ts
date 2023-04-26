import { SubmissionScope } from "./submission";
export interface ActionScope extends SubmissionScope {
    action: any;
    handler: string;
    method: string;
    actions: any;
}