
export enum StorageType {
    SYNC = "sync",
    LOCAL = "local",
}

export interface AIModel {
    object: 'model';
    created: number,
    id: string,
    owned_by: string
}