const path = require('path');
const semver = require('semver');
const pkgJsonObj = require(path.resolve(process.cwd(), 'package.json'));

const checkIfInstall = (pkgName) => {
  return Boolean(pkgJsonObj?.devDependencies?.[pkgName]);
};

const checkESLintSemver = () => {
  const eslintVersion =
    semver.coerce(pkgJsonObj?.devDependencies?.eslint) ?? '0.0.0';
  return semver.gte(eslintVersion, '8.0.0');
};

const checkESLint = async () => {
  const spinner = (await import('ora')).default();
  try {
    spinner.start('Checking if eslint installed');
    if (checkIfInstall('eslint')) {
      if (!checkESLintSemver()) {
        spinner.warn(
          'Detected that eslint version is lower than 8.0.0, run `npm update eslint` to update.',
        );
      } else {
        spinner.stop();
      }
    } else {
      spinner.warn(
        'Detected that eslint is not installed, run `npm install eslint` to install.',
      );
    }
  } catch (e) {
    console.log(e);
    spinner.fail('Failed in checking if eslint installed.');
  }
};

const checkPrettier = async () => {
  const spinner = (await import('ora')).default();
  try {
    spinner.start('Checking if prettier installed');
    if (!checkIfInstall('prettier')) {
      spinner.warn(
        'Detected that prettier is not installed, run `npm install prettier` to install.',
      );
    } else {
      spinner.stop();
    }
  } catch {
    spinner.fail('Failed in checking if eslint installed.');
  }
};

module.exports = { checkESLint, checkPrettier };
