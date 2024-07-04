export enum ExtendPlugin {
  TYPESCRIPT,
  // VUE2,
  // VUE3,
  // REACT,
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

// TODO: support vue2/vue3/react
export const EXTEND_PKG_MAP = {
  [ExtendPlugin.TYPESCRIPT]: 'typescript-eslint@^7.0.0',
  // [ExtendPlugin.VUE2]: null,
  // [ExtendPlugin.VUE3]: null,
  // [ExtendPlugin.REACT]: null,
};

export const PKG_LIST = [
  '@antfu/eslint-define-config@1.23.0-2',
  'globals@^14.0.0',
  'eslint@^8.56.0',
  'eslint-config-prettier@^9.1.0',
  'eslint-plugin-prettier@^5.1.3',
  'prettier@^3.0.0',
];

export const INSTALL_CMD_MAP = {
  [PkgManager.NPM]: 'npm install -D ',
  [PkgManager.YARN]: 'yarn add -D ',
  [PkgManager.PNPM]: 'pnpm add -D ',
};
