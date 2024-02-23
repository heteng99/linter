/**
 * make template of eslint.config.js & prettier.config.js
 */

const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const prompts = require('prompts');

const eslintConfigTemplate = `import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      // add global various here
      // https://eslint.org/blog/2022/08/new-config-system-part-2/#goodbye-environments%2C-hello-globals
      // globals: {
      //   ...globals.node,
      //   ...globals.browser,
      // },

      // add your custom global various here
      // myCustomGlobalVar: 'readonly',
    },
  },
);
`;

const prettierConfigTemplate = `/** @type {import("prettier").Config} */
export default {
  // add your prettier rules here
  // @see https://prettier.io/docs/en/options.html
  // singleQuote: true,
};
`;

const makeESLintConfigFile = (selectedConfigs) => {
  const importStatements = [];
  const configStatements = [];
  for (const [importStatement, configStatement] of selectedConfigs) {
    importStatement && importStatements.push(importStatement);
    configStatement && configStatements.push(configStatement);
  }
  const templateArr = eslintConfigTemplate.split('\n');
  const importPosition =
    templateArr.indexOf(`import globals from 'globals';`) + 1;
  const configPosition =
    templateArr.indexOf(`export default tseslint.config(`) +
    importStatements.length +
    1;
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

const writeConfigFile = async (fileContent, fileName) => {
  const spinner = (await import('ora')).default();
  spinner.start(`Generating ${fileName}`);
  try {
    if (fsSync.existsSync(path.resolve(process.cwd(), fileName))) {
      spinner.stop();
      const doOverwrite = await askIfOverwriteConfigFile(fileName);
      if (!doOverwrite) {
        spinner.warn(
          `Failed in writing config file: config file '${fileName}' exists.`,
        );
        return;
      }
    }
    await fs.writeFile(path.resolve(process.cwd(), fileName), fileContent, {
      flag: 'w',
    });
    spinner.succeed(`File '${fileName}' is generated successfully.`);
  } catch {
    spinner.warn(`Failed in writing file '${fileName}'.`);
  }
};

const writeESLintConfigFile = async (selectedConfigs) => {
  await writeConfigFile(
    makeESLintConfigFile(selectedConfigs),
    'eslint.config.js',
  );
};

const writePrettierConfigFile = async () => {
  await writeConfigFile(prettierConfigTemplate, 'prettier.config.js');
};

module.exports = {
  writeESLintConfigFile,
  writePrettierConfigFile,
};
