import { FormScope } from "./form";

export interface ProjectConfig {
    url: string;
    key: string;
}

export interface User {
    _id: string;
    data: any;
    roles: string[];
    form: string;
    project: string;
    metadata: any;
}

export interface AuthToken {
    iat?: number;
    exp?: number;
    user: User;
    form: {
        _id: string;
    };
    project: {
        _id: string;
    };
}

export interface AuthConfig {
    portal: string;
    secret: string;
    expire: number;
}

export interface ServerConfig {
    project: ProjectConfig;
    auth: AuthConfig;
    license: string;
    status: any;
}

export interface DBConfig {
    url: string;
    name: string;
    config: any;
}

export interface ServerDB {
    config: DBConfig;
    connect: () => Promise<void>;
    save: (collection: string, doc: any) => Promise<any>;
    load: (collection: string) => Promise<any>;
    index: (scope: FormScope, query: any) => Promise<any>;
    create: (scope: FormScope, doc: any, allowFields?: string[]) => Promise<any>;
    read: (scope: FormScope, id: string) => Promise<any>;
    update: (scope: FormScope, id: string, doc: any, allowFields?: string[]) => Promise<any>;
    delete: (scope: FormScope, id: string) => Promise<any>;
    find: (scope: FormScope, query: any) => Promise<any>;
    findOne: (scope: FormScope, query: any) => Promise<any>;
}

export interface AuthModule {
    token: (user: AuthToken, secret: string, expire: number) => Promise<string>;
    user: (token: string, secret: string) => Promise<AuthToken | null>;
}

export interface LicenseTerms {
    serverless: string[];
}

export interface LicenseKey {
    terms: LicenseTerms;
}

export interface ServerScope {
    licenseKey: LicenseKey;
    config: ServerConfig;
    db: ServerDB;
    auth: AuthModule;
    access: any;
    hooks: any;
    template: any;
    utils: any;
    util: any;
    hook: (name: string, ...args: any[]) => void;
}