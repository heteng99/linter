const path = require('path');
const fs = require('fs');

const checkCwdIsRootDir = () => {
  return fs.existsSync(path.resolve(process.cwd(), 'package.json'));
};

module.exports = {
  checkCwdIsRootDir,
};
