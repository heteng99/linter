export enum ModuleType {
  ESM,
  CJS,
  NONE,
}

export enum ExtendPlugin {
  ESLINT,
  TYPESCRIPT,
  VUE2,
  VUE3,
  REACT,
}

export enum Env {
  BROWSER,
  NODE,
}

export enum PkgManager {
  NPM = 'npm',
  PNPM = 'pnpm',
  YARN = 'yarn',
}

export const CONFIG_FILENAME_MAP = {
  [ModuleType.ESM]: ['eslint.config.mjs', 'prettier.config.mjs'],
  [ModuleType.CJS]: ['eslint.config.cjs', 'prettier.config.cjs'],
  [ModuleType.NONE]: ['eslint.config.js', 'prettier.config.js'],
};

// TODO: support frameworks such as vue, react etc.
export const IMPORT_MAP = {
  [ExtendPlugin.ESLINT]: `import eslint from '@eslint/js';`,
  [ExtendPlugin.TYPESCRIPT]: `import tseslint from 'typescript-eslint';`,
  [ExtendPlugin.VUE2]: null,
  [ExtendPlugin.VUE3]: null,
  [ExtendPlugin.REACT]: null,
};

export const CONFIG_MAP = {
  [ExtendPlugin.ESLINT]: '  eslint.configs.recommended,',
  [ExtendPlugin.TYPESCRIPT]: '  ...tseslint.configs.recommended,',
  [ExtendPlugin.VUE2]: null,
  [ExtendPlugin.VUE3]: null,
  [ExtendPlugin.REACT]: null,
};

export const EXTEND_PKG_MAP = {
  [ExtendPlugin.ESLINT]: null,
  [ExtendPlugin.TYPESCRIPT]: 'typescript-eslint@^7.0.0',
  [ExtendPlugin.VUE2]: null,
  [ExtendPlugin.VUE3]: null,
  [ExtendPlugin.REACT]: null,
};

export const PKG_LIST = [
  '@antfu/eslint-define-config@1.23.0-2',
  'globals@^14.0.0',
  'eslint@^8.40.0',
  'eslint-config-prettier@^9.1.0',
  'eslint-plugin-prettier@^5.1.3',
  'prettier@^3.0.0',
];

export const INSTALL_CMD_MAP = {
  [PkgManager.NPM]: 'npm install -D ',
  [PkgManager.YARN]: 'yarn add -D ',
  [PkgManager.PNPM]: 'pnpm add -D ',
};
