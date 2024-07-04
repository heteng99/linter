const genESMImport = (packages: [string, string][]) => {
  let output = '';
  for (const [name, path] of packages) {
    output += `import ${name} from '${path}';\n`;
  }
  return output;
};

const genCJSImport = (packages: [string, string][]) => {
  let output = '';
  for (const [name, path] of packages) {
    output += `const ${name} = require('${path}');\n`;
  }
  return output;
};

const genESMExport = (exportPkgs: string[]) => {
  let output = 'export default [\n';
  for (const exportPkg of exportPkgs) {
    output += `\t${exportPkg},\n`;
  }
  output += ']\n';
  return output;
};

const genCJSExport = (exportPkgs: string[]) => {
  let output = 'module.exports = [\n';
  for (const exportPkg of exportPkgs) {
    output += `\t${exportPkg},\n`;
  }
  output += ']\n';
  return output;
};

const genStatement = (statements: string[]) => {
  let output = '';
  for (const statement of statements) {
    output += statement + '\n';
  }
  return output;
};

export const generateEslintConfigFile = (
  packages: [string, string][],
  exportPackages: string[],
  statements: string[],
  type: 'esm' | 'cjs',
) => {
  let output = '';
  const genImport = type === 'esm' ? genESMImport : genCJSImport;
  const genExport = type === 'esm' ? genESMExport : genCJSExport;
  const _genStatement = genStatement;

  output += genImport(packages) + '\n';
  output += _genStatement(statements) + '\n';
  output += genExport(exportPackages);

  return output;
};

export const generatePrettierConfigFile = (exportLines: string[], type: 'esm' | 'cjs') => {
  let output = '/** @type {import("prettier").Config} */\n';
  if (type === 'esm') {
    output += 'export default {\n';
  } else {
    output += 'module.exports = {\n';
  }
  for (const line of exportLines) {
    output += line + '\n';
  }
  output += '}\n';
  return output;
};
