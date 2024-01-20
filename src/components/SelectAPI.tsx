import React from "react";

interface SelectAPIProps {
  value: string;
  onChange: (value: string) => void;
}

const SelectAPI: React.FC<SelectAPIProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-white text-sm font-bold mb-2"
        htmlFor="api-select"
      >
        Choose AI Chat API
      </label>
      <select
        id="api-select"
        className="shadow border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="openai">OpenAI</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
};

export default SelectAPI;
