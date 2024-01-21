import { AIContext } from "@shared/@types/shared";
import { useState, useEffect, useContext, createContext } from "react";

const AIContext = createContext({});
export const useAI = () => useContext(AIContext);

export const AIProvider: React.FC<{ children: any; props: any }> = ({
  children,
  props,
}) => {
  const [config, setConfig] = useState({});
  const funcs = {
    listModels: async () => {},
  };

  return (
    <AIContext.Provider value={{ config, setConfig, ...funcs }}>
      {children}
    </AIContext.Provider>
  );
};
