import js from "@eslint/js"
import prettierConfig from "eslint-config-prettier"
import prettier from "eslint-plugin-prettier"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import tseslint from "typescript-eslint"

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig,
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        ignores: ["**/routeTree.gen.ts"],
        languageOptions: {
            parser: tseslint.parser,
        },
        plugins: {
            "simple-import-sort": simpleImportSort,
            prettier,
        },
        rules: {
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "prettier/prettier": "error",
        },
    },
]
