/// <reference types="chrome" />
import { StorageType } from "../@types/shared";
/* 
    create a hook to handle storing any data to chrome.storage.sync or chrome.storage.local
*/

/*
* Description: A hook to handle storing any data to chrome.storage.sync or chrome.storage.local 
* @param { StorageType } storageType - the type of storage to use
* @returns [(data: any, setData: (key: string, value: any)=>void, removeData:(key: string)=>void), clearData: ()=>void]
*/

const useStorage = (storageType: StorageType): { setStorage: (key: string, value: any) => Promise<void>, getStorage: (key: string) => Promise<any>, removeStorage: (key: string) => Promise<void>, clearStorage: () => Promise<void> } => {


    const setStorage = async (key: string, value: any): Promise<void> => {
        return await chrome.storage[storageType].set({ [key]: value })
    }

    const getStorage = async (key: string): Promise<any> => {
        return await chrome.storage[storageType].get([key]).then((result) => {
            console.log(result[key])
            return result[key];
        })
    }

    const removeStorage = async (key: string): Promise<void> => {
        await chrome.storage[storageType].remove(key)
    }

    const clearStorage = async (): Promise<void> => {
        await chrome.storage[storageType].clear();
    }

    return { setStorage, getStorage, removeStorage, clearStorage };
}

export default useStorage;
