/**
 * make template of eslint.config.js & prettier.config.js
 */

import fsp from 'node:fs/promises';
import fs from 'node:fs';
import path from 'node:path';
import prompts from 'prompts';
import ora from 'ora';
import {
  generateEslintConfigFile,
  generatePrettierConfigFile,
} from './templates/generate-config-file';
import {
  basePackages,
  baseStatement,
  extendExports,
  extendPackages,
  extendStatement,
  getBaseExports,
} from './templates/eslint-config-constants';
import { exportLines } from './templates/prettier-config-constants';
import { ExtendPlugin, Env } from './constants';

const askIfOverwriteConfigFile = async (fileName = 'the config file') => {
  const { doOverwrite } = await prompts([
    {
      type: 'confirm',
      name: 'doOverwrite',
      message: `Detected ${fileName} exists, do you wanna overwrite it?`,
      initial: true,
    },
  ]);
  return Boolean(doOverwrite);
};

const writeConfigFile = async (fileContent: string, fileName: string) => {
  const spinner = ora();
  spinner.start(`Generating ${fileName}`);
  try {
    if (fs.existsSync(path.resolve(process.cwd(), fileName))) {
      spinner.stop();
      const doOverwrite = await askIfOverwriteConfigFile(fileName);
      if (!doOverwrite) {
        spinner.warn(`Failed in generating config file: config file '${fileName}' exists.`);
        return;
      }
    }
    await fsp.writeFile(path.resolve(process.cwd(), fileName), fileContent, { flag: 'w' });
    spinner.succeed(`File '${fileName}' is generated successfully.`);
  } catch {
    spinner.warn(`Failed in generating config file '${fileName}'.`);
  }
};

export const writeESLintConfigFile = async (
  extendPlugins: ExtendPlugin[],
  env: Env,
  moduleType: 'esm' | 'cjs',
) => {
  const packages = basePackages;
  const statements = baseStatement;
  const exports = getBaseExports(env);
  for (const extendPlugin of extendPlugins) {
    packages.push(...extendPackages[extendPlugin]);
    statements.push(...extendStatement[extendPlugin]);
    exports.push(...extendExports[extendPlugin]);
  }
  const fileContent = generateEslintConfigFile(packages, exports, statements, moduleType);
  await writeConfigFile(fileContent, 'eslint.config.js');
};

export const writePrettierConfigFile = async (moduleType: 'esm' | 'cjs') => {
  const fileContent = generatePrettierConfigFile(exportLines, moduleType);
  await writeConfigFile(fileContent, 'prettier.config.js');
};
