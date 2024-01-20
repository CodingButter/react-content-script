import React, { useState, useEffect } from "react";
import SelectModel from "./components/SelectModel";
import APIKeyInput from "./components/APIKeyInput";

const App: React.FC = () => {
  const [api, setApi] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    // Load saved settings from chrome.storage
    chrome.storage.sync.get(["api", "model", "apiKey"], (result) => {
      if (result.api) setApi(result.api);
      if (result.model) setModel(result.model);
      if (result.apiKey) setApiKey(result.apiKey);
    });
  }, []);

  const handleSave = () => {
    // Save settings to chrome.storage
    chrome.storage.sync.set({ api, model, apiKey });
    // Add any additional actions upon saving, like notifications
  };

  return (
    <div className="w-300 h-500 p-4 bg-gpt-grey">
      <SelectModel value={model} onChange={setModel} />
      <APIKeyInput value={apiKey} onChange={setApiKey} />
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default App;
