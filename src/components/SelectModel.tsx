import React, { useState, useEffect, useRef } from "react";
import useGetModels from "@popup/hooks/useGetModels";

interface SelectModelProps {
  value: string;
  onChange: (apiName: string) => void;
}

const SelectModel: React.FC<SelectModelProps> = ({ value, onChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { models, loading, error } = useGetModels(searchQuery);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    const selectedModel = models.find((model) => model.apiName === value);
    if (selectedModel && !showDropdown) {
      setSearchQuery(selectedModel.name);
    }
  }, [value, models, showDropdown]);

  const handleSelectModel = (apiName: string) => {
    onChange(apiName);
    setShowDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowDropdown(true);
  };

  return (
    <div ref={wrapperRef} className="flex flex-col">
      <label
        className="block text-white text-sm font-bold mb-2"
        htmlFor="model-select"
      >
        Choose AI Chat Model
      </label>
      <input
        id="model-select"
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search models..."
        className="mb-2 p-2 border border-gray-300 rounded"
        onFocus={() => {
          setShowDropdown(true);
          setSearchQuery("");
        }}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {showDropdown && (
        <ul className="max-h-60 overflow-auto border border-gray-300 rounded">
          {models.map((model) => (
            <li
              key={model.apiName}
              className={`p-2 hover:bg-gray-100 cursor-pointer ${
                model.apiName === value ? "bg-gray-200" : ""
              }`}
              onClick={() => handleSelectModel(model.apiName)}
            >
              {model.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectModel;
