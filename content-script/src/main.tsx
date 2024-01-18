import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const addLinkToStylesheet = (href: string) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.append(link);
};

void (async () => {
  // Inject the stylesheet into the current page.
  // This is necessary because the content script runs in an isolated world.
  addLinkToStylesheet(chrome.runtime.getURL("assets/main.css"));
  const body = document.querySelector("body");

  const app = document.createElement("div");

  app.id = "root";
  // Make sure the element that you want to mount the app to has loaded. You can
  // also use `append` or insert the app using another method:
  // https://developer.mozilla.org/en-US/docs/Web/API/Element#methods
  //
  // Also control when the content script is injected from the manifest.json:
  // https://developer.chrome.com/docs/extensions/mv3/content_scripts/#run_time
  if (body) {
    body.append(app);
  }

  const container = document.getElementById("root");
  const root = createRoot(container!);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})();
