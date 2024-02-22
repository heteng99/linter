const prompts = require('prompts');

const RECOMMENDED_CONFIG_OPTIONS = {
  ESLINT_RECOMMENDED: 0,
  TYPESCRIPT: 1,
  VUE: 2,
  VUE3: 3,
  REACT: 4,
};

const selectRecommendedConfig = async () => {
  const { selectedConfigs } = await prompts([
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
        { title: 'Vue.js 2.x', value: RECOMMENDED_CONFIG_OPTIONS.VUE },
        { title: 'Vue.js 3.x', value: RECOMMENDED_CONFIG_OPTIONS.VUE3 },
        { title: 'React', value: RECOMMENDED_CONFIG_OPTIONS.REACT },
      ],
    },
  ]);
  return selectedConfigs;
};

module.exports = { selectRecommendedConfig, RECOMMENDED_CONFIG_OPTIONS };
