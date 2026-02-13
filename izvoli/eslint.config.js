import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import pluginImport from "eslint-plugin-import";
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginVue from "eslint-plugin-vue";

export default defineConfig([
  js.configs.recommended,
  pluginImport.flatConfigs.recommended,
  ...pluginVue.configs["flat/recommended"],
  globalIgnores(["dist/"]),
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-console": "warn",
      "no-alert": "warn",
      "import/extensions": ["error", "always", { ignorePackages: true }],
      "import/no-extraneous-dependencies": [
        "error",
        {
          optionalDependencies: false,
          devDependencies: ["eslint.config.js", "vite.config.js"],
        },
      ],
    },
    settings: {
      "import/resolver": {
        alias: [["@", "./src"]],
      },
    },
  },
  pluginPrettierRecommended,
]);
