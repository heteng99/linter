const { checkESLint, checkPrettier } = require('./check-if-install.cjs');
const {
  selectRecommendedConfig,
  selectedConfigs,
} = require('./select-recommended.cjs');
const {
  writeESLintConfigFile,
  writePrettierConfigFile,
} = require('./make-config.cjs');

(async () => {
  await selectRecommendedConfig();
  await checkESLint();
  await checkPrettier();
  await writeESLintConfigFile(selectedConfigs);
  await writePrettierConfigFile();
})();
