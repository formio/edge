import { ProcessScope, Processor as ProcessorType } from '@formio/appserver-types';
export declare const Proccessors: {
    fetch: (scope: ProcessScope) => Promise<never[]>;
    calculate: (scope: ProcessScope) => Promise<never[]>;
    conditions: (scope: ProcessScope) => Promise<never[]>;
    defaultProcessor: (scope: ProcessScope) => Promise<never[]>;
    validate: (scope: ProcessScope) => Promise<never[]>;
};
export declare const Processor: ProcessorType;
