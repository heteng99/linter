import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineFlatConfig } from '@antfu/eslint-define-config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const [tsLangOptions, tsCommonConfigs, tsConfigs] = [...tseslint.configs.recommended];
tsConfigs.files = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'];

export default [
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  defineFlatConfig({
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
    languageOptions: {
      globals: globals.node,
    },
  }),
  tsLangOptions,
  tsCommonConfigs,
  tsConfigs,
];
