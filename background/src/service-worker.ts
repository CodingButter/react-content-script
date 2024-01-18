const runServiceWorker = () => {
    //on extension clicked aler hello extension
    chrome.action.onClicked.addListener((tab: any) => {
        chrome.scripting.executeScript({
            // @ts-ignore
            target: { tabId: tab.id },
            // @ts-ignore
            function: () => {
                alert("Hello Extension");
            },
        });
    });
}

export default (() => {
    runServiceWorker();
})();