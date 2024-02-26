import path from 'node:path';
import fsp from 'node:fs/promises';
import semver from 'semver';
import ora from 'ora';

const getPkgJSONObj = async () => {
  try {
    const pkgJSONPath = path.resolve(process.cwd(), 'package.json');
    const pkgJSONContent = await fsp.readFile(pkgJSONPath, 'utf-8');
    return JSON.parse(pkgJSONContent) as Record<string, any>;
  } catch {
    return null;
  }
};

const checkIfInstall = (pkgJSONObj: Record<string, any> | null, pkgName: string) => {
  return Boolean(pkgJSONObj?.devDependencies?.[pkgName]);
};

const checkESLintSemver = (pkgJSONObj: Record<string, any> | null) => {
  const eslintVersion = semver.coerce(pkgJSONObj?.devDependencies?.eslint) ?? '0.0.0';
  return semver.gte(eslintVersion, '8.0.0');
};

export const checkESLint = async () => {
  const spinner = ora();
  try {
    spinner.start('Checking if eslint installed');
    const pkgJSONObj = await getPkgJSONObj();
    if (checkIfInstall(pkgJSONObj, 'eslint')) {
      if (!checkESLintSemver(pkgJSONObj)) {
        spinner.warn('Detected that eslint version is lower than 8.0.0, run `npm update eslint` to update.');
      } else {
        spinner.stop();
      }
    } else {
      spinner.warn('Detected that eslint is not installed, run `npm install eslint` to install.');
    }
  } catch (e) {
    console.log(e);
    spinner.fail('Failed in checking if eslint installed.');
  }
};

export const checkPrettier = async () => {
  const spinner = ora();
  try {
    spinner.start('Checking if prettier installed');
    const pkgJSONObj = await getPkgJSONObj();
    if (!checkIfInstall(pkgJSONObj, 'prettier')) {
      spinner.warn('Detected that prettier is not installed, run `npm install prettier` to install.');
    } else {
      spinner.stop();
    }
  } catch {
    spinner.fail('Failed in checking if eslint installed.');
  }
};
