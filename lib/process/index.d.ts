import { ProcessScope } from '../types/submission';
export declare const Proccessors: {
    fetch: (scope: ProcessScope) => Promise<never[]>;
    calculate: (scope: ProcessScope) => Promise<never[]>;
    conditions: (scope: ProcessScope) => Promise<never[]>;
    validate: (scope: ProcessScope) => Promise<never[]>;
};
export declare const PreProccessors: ((scope: ProcessScope) => Promise<never[]>)[];
export declare const Processor: (scope: ProcessScope) => Promise<any>;
