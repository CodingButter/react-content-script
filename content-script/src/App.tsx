/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />
import "./App.css";
import { useEffect, useState } from "react";
import useAI from "@script/hooks/useAI";

function App() {
  const { listModels } = useAI();

  useEffect(() => {}, []);

  return (
    <div className="relative App w-screen h-screen p-10 overflow-hidden flex justify-center items-center">
      <div className="relative w-2/3 h-2/3 rounded-md overflow-hidden shadow-lg">
        <div className="absolute top-0 bottom-0 right-0 left-0 image-container w-full h-full rounded-md overflow-hidden shadow-lg"></div>
        <div className="relative gap-2 p-8 w-full h-full flex flex-col justify-center items-center rounded-md overflow-hidden shadow-lg"></div>
      </div>
    </div>
  );
}

export default App;
