import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      // https://eslint.org/blog/2022/08/new-config-system-part-2/#goodbye-environments%2C-hello-globals
      globals: globals.node,
    },
  },
);
