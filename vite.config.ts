import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ciscode-template",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react-router", "zod", "@ciscode-template-model/translate-core"],
    },
  },
});