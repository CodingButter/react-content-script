import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
interface APIKeyInputProps {
  value: string;
  onChange: (value: string) => void;
}

const APIKeyInput: React.FC<APIKeyInputProps> = ({ value, onChange }) => {
  const triggerRef = useRef<HTMLElement>(null);

  const handleClose = () => {
    console.log("Modal closed");
  };

  return (
    <div className="mb-4">
      <label
        className="block text-white text-sm font-bold mb-2"
        htmlFor="api-key"
      >
        API Key
      </label>
      <div className="relative flex items-center justify-center h-12">
        <input
          id="api-key"
          type="password"
          className="shadow appearance-none w-full border rounded py-2 px-3 pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div
          ref={triggerRef as React.RefObject<HTMLDivElement>}
          className="flex justify-center items-center absolute right-2 top-0 h-full rounded-full text-2xl"
        >
          <FontAwesomeIcon
            className="hover:bg-blue-700 bg-blue-400 border text-white border-blue-900 rounded-full shadow-lg"
            icon={faCircleInfo}
          />
        </div>
      </div>
      <Modal
        triggerRef={triggerRef}
        mouseLeaveDistance={50}
        onClose={handleClose}
        shouldFollowMouse={true}
      >
        <div className="bg-white rounded-md shadow-lg p-4 flex justify-center items-center w-24 flex-col">
          This is the modal content.
        </div>
      </Modal>
    </div>
  );
};

export default APIKeyInput;
