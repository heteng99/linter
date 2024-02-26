import { checkESLint, checkPrettier } from './check-if-install';
import { selectRecommendedConfig } from './select-recommended';
import { writeESLintConfigFile, writePrettierConfigFile } from './make-config';

(async () => {
  const selectedConfigs = await selectRecommendedConfig();
  await checkESLint();
  await checkPrettier();
  await writeESLintConfigFile(selectedConfigs);
  await writePrettierConfigFile();
})();
