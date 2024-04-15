import * as prompts from './prompts';
import { writeESLintConfigFile, writePrettierConfigFile } from './make-config';
import { EXTEND_PKG_MAP, ExtendPlugin, INSTALL_CMD_MAP, PKG_LIST } from './constants';
import { execSync } from 'child_process';
import ora from 'ora';

const getPkgList = (extendPlugins: ExtendPlugin[]) => {
  const basePkgList = PKG_LIST;
  for (const extendPlugin of extendPlugins) {
    if (EXTEND_PKG_MAP[extendPlugin]) {
      basePkgList.push(EXTEND_PKG_MAP[extendPlugin] as string);
    }
  }
  return basePkgList;
};

(async () => {
  const env = await prompts.selectEnv();
  const extendPlugins = await prompts.selectExtends();
  const moduleType = await prompts.selectModuleType();
  const pkgList = getPkgList(extendPlugins);
  const installNow = await prompts.askInstallPkgNow(pkgList);

  if (installNow) {
    const pkgManager = await prompts.selectPkgManager();
    const spinner = ora();
    spinner.start('Installing dependencies, please wait.');
    execSync(INSTALL_CMD_MAP[pkgManager] + pkgList.join(' '));
    spinner.succeed('Done.');
  }

  await writeESLintConfigFile(extendPlugins, env, moduleType);
  await writePrettierConfigFile(moduleType);

  process.exit(0);
})();
