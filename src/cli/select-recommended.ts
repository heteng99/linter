/**
 * select recommended configs
 */

import prompts from 'prompts';

export enum SelectedKey {
  ESLINT = 'eslint',
  TYPESCRIPT = 'typescript',

  // TODO: to be supported
  // VUE = 'vue',
  // REACT = 'react',
}

export const RECOMMENDED_IMPORT_STATEMENT: Record<SelectedKey, string> = {
  [SelectedKey.ESLINT]: `import eslint from '@eslint/js';`,
  [SelectedKey.TYPESCRIPT]: `import tseslint from 'typescript-eslint';`,
};

export const RECOMMENDED_CONFIG_STATEMENT = {
  [SelectedKey.ESLINT]: '  eslint.configs.recommended,',
  [SelectedKey.TYPESCRIPT]: '  ...tseslint.configs.recommended,',
};

export const selectRecommendedConfig = async () => {
  const response = await prompts([
    {
      type: 'multiselect',
      name: 'selectedConfigs',
      message: 'Select your configs',
      choices: [
        {
          title: 'eslint',
          value: SelectedKey.ESLINT,
        },
        {
          title: 'typescript',
          value: SelectedKey.TYPESCRIPT,
        },
      ],
    },
  ]);
  return response.selectedConfigs as SelectedKey[];
};
