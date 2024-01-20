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

const useStorage = (storageType: StorageType, sendToScript: boolean = true): { setStorage: (key: string, value: any) => Promise<void>, getStorage: (key: string) => Promise<any>, removeStorage: (key: string) => Promise<void>, clearStorage: () => Promise<void> } => {


    const setStorage = async (key: string, value: any): Promise<void> => {
        await chrome.storage[storageType].set({ [key]: value })
        if (sendToScript) {
            chrome.runtime.sendMessage({ type: "setStorage", key, value });
        }
    }

    const getStorage = async (key: string): Promise<any> => {
        const result = await chrome.storage[storageType].get([key]).then((result) => result[key])
        if (sendToScript) {
            chrome.runtime.sendMessage({ type: "getStorage", key, value: result });
        }
        return result;
    }

    const removeStorage = async (key: string): Promise<void> => {
        await chrome.storage[storageType].remove(key)
        if (sendToScript) {
            chrome.runtime.sendMessage({ type: "removeStorage", key });
        }
    }

    const clearStorage = async (): Promise<void> => {
        await chrome.storage[storageType].clear();
        if (sendToScript) {
            chrome.runtime.sendMessage({ type: "clearStorage" });
        }
    }

    return { setStorage, getStorage, removeStorage, clearStorage };
}

export default useStorage;
