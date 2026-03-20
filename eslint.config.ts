import { configs as jsConfigs } from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import { flatConfigs as importConfigs } from "eslint-plugin-import";
import { configs as tsConfigs } from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["**/dist/"],
  },
  jsConfigs.recommended,
  tsConfigs.recommendedTypeChecked,
  importConfigs.recommended,
  importConfigs.typescript,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.ts", "vitest.config.ts"],
        },
      },
    },
    rules: {
      "import/order": [
        "error",
        {
          alphabetize: { order: "asc" },
        },
      ],
      "no-unused-vars": "off",
      "prefer-arrow-callback": "error",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
    },
    settings: {
      "import/resolver": {
        typescript: {},
      },
    },
  },
  eslintConfigPrettier,
]);
