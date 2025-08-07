import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "indent": ["error", 4],
            "quotes": ["error", "double"],
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    varsIgnorePattern: "^_",
                    argsIgnorePattern: "^_",
                },
            ],
        },
    },
    {
        files: ["webpack.config.js"],
        languageOptions: { globals: globals.node },
        rules: {
            "@typescript-eslint/no-require-imports": "off"
        }
    },
    {
        ignores: [
            "**/dist/**",
            "**/node_modules/**"
        ]
    }
];