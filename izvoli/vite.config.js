import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint2";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    host: true,
    port: 3000,
  },
  plugins: [vue(), eslint()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  compilerOptions: {
    isCustomElement: (tag) => tag.includes("-"),
  },
});
