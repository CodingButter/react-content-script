/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />
import { useEffect, useState } from "react";
import "./App.css";

async function getUnsplashImage() {
  const response = await fetch(
    "https://source.unsplash.com/random/1920x1080?nature"
  );
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  return url;
}

function App() {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    getUnsplashImage().then((url) => setImage(url));
  }, []);

  return (
    <div className="App w-screen h-screen p-10 overflow-hidden flex justify-center items-center">
      <div className="image-container w-1/2 h-1/2 rounded-md overflow-hidden shadow-lg">
        {image && (
          <img
            src={image}
            alt="unsplash"
            className="object-cover w-full h-full"
          />
        )}
      </div>
    </div>
  );
}

export default App;
