import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      // add global various here
      // https://eslint.org/blog/2022/08/new-config-system-part-2/#goodbye-environments%2C-hello-globals
      globals: globals.node,
      // add your custom global various here
      // myCustomGlobalVar: 'readonly',
    },
  },
);
