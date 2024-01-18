import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import hotReloadExtension from 'hot-reload-extension-vite';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
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
      backgroundPath: 'content-script/src/*'
    }),
    hotReloadExtension({
      log: true,
      backgroundPath: 'background/src/*'
    }),
    hotReloadExtension({
      log: true,
      backgroundPath: 'src/*'
    }),
    checker({ typescript: true }),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      }
    },
  }
});
