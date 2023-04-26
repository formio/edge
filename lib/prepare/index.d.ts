import { PrepScope } from '../types/submission';
export declare const Preppers: {
    bcrypt: (scope: PrepScope) => Promise<void>;
    access: (scope: PrepScope) => Promise<void>;
    persist: (scope: PrepScope) => Promise<void>;
    protect: (scope: PrepScope) => Promise<void>;
    password: (scope: PrepScope) => Promise<void>;
};
export declare const MethodPreppers: any;
export declare const Prepper: (scope: PrepScope) => Promise<{}>;
