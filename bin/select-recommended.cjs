/**
 * select recommended configs
 */

const prompts = require('prompts');

const selectedConfigs = [];

const RECOMMENDED_CONFIG_OPTIONS = {
  ESLINT_RECOMMENDED: [
    `import eslint from '@eslint/js';`,
    '  eslint.configs.recommended,',
  ],
  TYPESCRIPT: [null, '  ...tseslint.configs.recommended,'],

  // TODO: to be supported
  // VUE: [],
  // VUE3: [],
  // REACT: [],
};

const selectRecommendedConfig = async () => {
  const response = await prompts([
    {
      type: 'multiselect',
      name: 'selectedConfigs',
      message: 'Selected the recommended configs',
      choices: [
        {
          title: 'ESLint Recommended',
          value: RECOMMENDED_CONFIG_OPTIONS.ESLINT_RECOMMENDED,
        },
        { title: 'TypeScript', value: RECOMMENDED_CONFIG_OPTIONS.TYPESCRIPT },

        // TODO: to be supported
        // { title: 'Vue.js 2.x', value: RECOMMENDED_CONFIG_OPTIONS.VUE },
        // { title: 'Vue.js 3.x', value: RECOMMENDED_CONFIG_OPTIONS.VUE3 },
        // { title: 'React', value: RECOMMENDED_CONFIG_OPTIONS.REACT },
      ],
    },
  ]);
  selectedConfigs.push(...response.selectedConfigs);
};

module.exports = {
  selectRecommendedConfig,
  RECOMMENDED_CONFIG_OPTIONS,
  selectedConfigs,
};
