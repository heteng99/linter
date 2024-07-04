import { Env, ExtendPlugin } from '../constants';

export const basePackages: [string, string][] = [
  ['eslint', '@eslint/js'],
  ['eslintPluginPrettierRecommended', 'eslint-plugin-prettier/recommended'],
  ['{ defineFlatConfig }', '@antfu/eslint-define-config'],
  ['globals', 'globals'],
];

export const baseStatement: string[] = [];

export const getBaseExports = (env: Env) => {
  return [
    'eslint.configs.recommended',
    'eslintPluginPrettierRecommended',
    `defineFlatConfig({
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
    languageOptions: {
      globals: ${env === Env.NODE ? 'globals.node' : 'globals.browser'},
    },
  })`,
  ];
};

const tsPackages: [string, string][] = [['tseslint', 'typescript-eslint']];

const tsStatement = [
  `const [tsLangOptions, tsCommonConfigs, tsConfigs] = [...tseslint.configs.recommended];`,
  `tsConfigs.files = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'];`,
];

const tsExports = ['tsLangOptions', 'tsCommonConfigs', 'tsConfigs'];

export const extendPackages = {
  [ExtendPlugin.TYPESCRIPT]: tsPackages,
};

export const extendStatement = {
  [ExtendPlugin.TYPESCRIPT]: tsStatement,
};

export const extendExports = {
  [ExtendPlugin.TYPESCRIPT]: tsExports,
};
