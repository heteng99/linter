const path = require('path');

const pkgJsonObj = require(path.resolve(process.cwd(), 'package.json'));

const checkIfInstall = (pkgName) => {
  return Boolean(pkgJsonObj?.devDependencies?.[pkgName]);
};

module.exports = { checkIfInstall };
