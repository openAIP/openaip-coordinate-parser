import babelParser from '@babel/eslint-parser';
import babelPresetEnv from '@babel/preset-env';
import onlyWarn from 'eslint-plugin-only-warn';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    eslintConfigPrettier,
    {
        files: ['**/*.js', '**/*.ts', '**/*.tsx'],
        ignores: ['coverage/', 'tests/'],
        plugins: { onlyWarn },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parser: babelParser,
            globals: {
                // global variables
            },
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    babelrc: false,
                    configFile: false,
                    presets: [babelPresetEnv],
                },
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            semi: 'error',
            'prefer-const': 'error',
            'require-atomic-updates': 'off',
            'no-unused-vars': 'warn',
            'no-useless-escape': 'off',
        },
    },
];
