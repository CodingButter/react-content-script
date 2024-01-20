import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import hotReloadExtension from 'hot-reload-extension-vite';
import checker from 'vite-plugin-checker';
// Directories to copy and their destinations
import CopyShares from "./copyshares";
import path from "path";

const directoriesToCopy = ["hooks", "components", "@types", "utils"];
const destinationDirectories = ["src", "content-script/src"];

export default defineConfig({
  plugins: [
    CopyShares({
      log: true,
      from: directoriesToCopy,
      to: destinationDirectories,
    }),
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
    // Build Chrome Extension
    crx({ manifest }),
    // Hot reload extension
    hotReloadExtension({
      log: true,
      backgroundPath: 'content-script/**/*'
    }),
    hotReloadExtension({
      log: true,
      backgroundPath: 'background/**/*'
    }),
    hotReloadExtension({
      log: true,
      backgroundPath: 'src/**/*'
    }),
    hotReloadExtension({
      log: true,
      backgroundPath: 'hooks/**/*'
    }),
    checker({ typescript: true }),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
      external: ['mathjs', 'react-chartjs-2']
    },
  },
  /* include the same alias from the typescript config */
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "./"),
      "@popup": path.resolve(__dirname, "./src/"),
      "@script": path.resolve(__dirname, "./content-script/src/"),
      "@background": path.resolve(__dirname, "./background/src/"),
    }
  }
});
