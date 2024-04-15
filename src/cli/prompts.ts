import prompts from 'prompts';
import { Env, ExtendPlugin, ModuleType, PkgManager } from './constants';

export const selectPkgManager = async () => {
  const { pkgManager } = await prompts([
    {
      type: 'select',
      name: 'pkgManager',
      message: 'Which package manager do you want to use?',
      choices: [
        { title: 'npm', value: PkgManager.NPM },
        { title: 'yarn', value: PkgManager.YARN },
        { title: 'pnpm', value: PkgManager.PNPM },
      ],
    },
  ]);
  return pkgManager as PkgManager;
};

export const selectModuleType = async () => {
  const { moduleType } = await prompts([
    {
      type: 'select',
      name: 'moduleType',
      message: 'Which file suffix do you want to use?',
      choices: [
        { title: '.esm', value: ModuleType.ESM },
        { title: '.cjs', value: ModuleType.CJS },
        { title: '.js', value: ModuleType.NONE },
      ],
    },
  ]);
  return moduleType as ModuleType;
};

export const selectEnv = async () => {
  const { env } = await prompts([
    {
      type: 'select',
      name: 'env',
      message: 'Where does your code run?',
      choices: [
        { title: 'browser', value: Env.BROWSER },
        { title: 'node', value: Env.NODE },
      ],
    },
  ]);
  return env as Env;
};

export const selectExtends = async () => {
  const result = [];
  const { useESLintRecommended, framework, useTypescript } = await prompts([
    {
      type: 'confirm',
      name: 'useESLintRecommended',
      message: 'Do you want to use eslint recommended?',
      initial: true,
    },
    {
      type: 'select',
      name: 'framework',
      message: 'Which framework does your project use?',
      choices: [
        { title: 'Vue2', value: ExtendPlugin.VUE2 },
        { title: 'Vue3', value: ExtendPlugin.VUE3 },
        { title: 'React', value: ExtendPlugin.REACT },
        { title: 'none', value: null },
      ],
    },
    {
      type: 'confirm',
      name: 'useTypescript',
      message: 'Does your project use typescript?',
      initial: true,
    },
  ]);
  if (useESLintRecommended) {
    result.push(ExtendPlugin.ESLINT);
  }
  if (useTypescript) {
    result.push(ExtendPlugin.TYPESCRIPT);
  }
  if (framework) {
    result.push(framework);
  }
  return result as ExtendPlugin[];
};

export const askInstallPkgNow = async (pkgList: string[]) => {
  console.log(`The config that you've selected requires the following dependencies:`);
  for (const pkg of pkgList) {
    console.log(pkg);
  }

  const { installNow } = await prompts([
    {
      type: 'confirm',
      name: 'installNow',
      message: 'Would you like to install them now?',
      initial: true,
    },
  ]);
  return installNow as boolean;
};
