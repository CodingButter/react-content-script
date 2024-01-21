
export enum StorageType {
    SYNC = "sync",
    LOCAL = "local",
}

export interface CONFIG {
    apiKey: string;
    model: string;
    temperature: number;
    endpoints: { [key: string]: string },
    prompt: string;
}

export interface AIModel {
    object: 'model';
    created: number,
    id: string,
    owned_by: string
}

export interface AIContext {
    config: CONFIG;
    setConfig: (config: CONFIG) => void;
    models: AIModel[];
    searchModels: (query: string) => AIModel[];

}