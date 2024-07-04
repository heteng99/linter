import prompts from 'prompts';
import { Env, ExtendPlugin, PkgManager } from './constants';

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
      message: 'Choose module type of the config files.',
      choices: [
        { title: 'esm', value: 'esm' },
        { title: 'cjs', value: 'cjs' },
      ],
    },
  ]);
  return moduleType as 'esm' | 'cjs';
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
  const { useTypescript } = await prompts([
    // TODO: make framework selectable
    // {
    //   type: 'select',
    //   name: 'framework',
    //   message: 'Which framework does your project use?',
    //   choices: [
    //     { title: 'Vue2', value: ExtendPlugin.VUE2 },
    //     { title: 'Vue3', value: ExtendPlugin.VUE3 },
    //     { title: 'React', value: ExtendPlugin.REACT },
    //     { title: 'none', value: null },
    //   ],
    // },
    {
      type: 'confirm',
      name: 'useTypescript',
      message: 'Use typescript in your project?',
      initial: true,
    },
  ]);

  if (useTypescript) {
    result.push(ExtendPlugin.TYPESCRIPT);
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
