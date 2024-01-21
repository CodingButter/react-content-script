const config: { [key: string]: string } = {
    apiKey: "",
};

(async () => {
    config.apiKey = await chrome.storage.sync.get("apiKey").then((res) => res.apiKey);
})();

const useAI = () => {
    console.log(config.apiKey)
    const listModels = async () => {

    }

    return { listModels };
}



export default useAI;