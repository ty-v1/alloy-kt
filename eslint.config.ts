import { configs as jsConfigs } from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import { flatConfigs as importConfigs } from "eslint-plugin-import";
import { configs as tsConfigs } from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["**/dist/", "**/docs/"],
  },
  jsConfigs.recommended,
  tsConfigs.recommendedTypeChecked,
  importConfigs.recommended,
  importConfigs.typescript,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          defaultProject: "./tsconfig.dev.json",
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
      "no-extra-boolean-cast": "error",
      "prefer-arrow-callback": "error",
      "@typescript-eslint/strict-boolean-expressions": [
        "error",
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: false,
          allowNullableBoolean: false,
          allowNullableString: false,
          allowNullableNumber: false,
          allowAny: false,
        },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
    },
    settings: {
      "import/resolver": {
        typescript: {},
      },
    },
  },
  eslintConfigPrettier,
  {
    rules: {
      curly: "error",
    },
  },
]);
