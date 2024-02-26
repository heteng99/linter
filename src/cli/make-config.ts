/**
 * make template of eslint.config.js & prettier.config.js
 */

import fsp from 'node:fs/promises';
import fs from 'node:fs';
import path from 'node:path';
import prompts from 'prompts';
import { RECOMMENDED_CONFIG_STATEMENT, RECOMMENDED_IMPORT_STATEMENT, SelectedKey } from './select-recommended';

const eslintConfigTemplate = `import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineFlatConfig } from '@antfu/eslint-define-config';
import globals from 'globals';

export default [
  eslintPluginPrettierRecommended,
  defineFlatConfig({
    languageOptions: {
      globals: globals.node,
    },
  }),
];
`;

const prettierConfigTemplate = `/** @type {import("prettier").Config} */
export default {
  // add your prettier rules here
  // @see https://prettier.io/docs/en/options.html
  // singleQuote: true,
};
`;

const makeESLintConfigFile = (selectedKeys: SelectedKey[]) => {
  const importStatements: string[] = [];
  const configStatements: string[] = [];
  for (const key of selectedKeys) {
    importStatements.push(RECOMMENDED_IMPORT_STATEMENT[key]);
    configStatements.push(RECOMMENDED_CONFIG_STATEMENT[key]);
  }
  const templateArr = eslintConfigTemplate.split('\n');
  const importPosition = 0;
  const configPosition = templateArr.indexOf(`export default [`) + importStatements.length + 1;
  templateArr.splice(importPosition, 0, ...importStatements);
  templateArr.splice(configPosition, 0, ...configStatements);
  return templateArr.join('\n');
};

const askIfOverwriteConfigFile = async (fileName = 'the config file') => {
  const { doOverwrite } = await prompts([
    {
      type: 'confirm',
      name: 'doOverwrite',
      message: `Detected ${fileName} exists, do you wanna overwrite it?`,
    },
  ]);
  return Boolean(doOverwrite);
};

const writeConfigFile = async (fileContent: string, fileName: string) => {
  const spinner = (await import('ora')).default();
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

export const writeESLintConfigFile = async (selectedKeys: SelectedKey[]) => {
  await writeConfigFile(makeESLintConfigFile(selectedKeys), 'eslint.config.js');
};

export const writePrettierConfigFile = async () => {
  await writeConfigFile(prettierConfigTemplate, 'prettier.config.js');
};
