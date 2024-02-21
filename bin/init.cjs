#!/usr/bin/env node

/* eslint-disable */
const path = require("path");
const fs = require("fs");
const cwdPath = process.cwd();
const templatesPath = path.resolve(__dirname, '../templates');

const copyFile = (originFile, targetFile) => {
  fs.readFile(originFile, (err, data) => {
    fs.writeFile(targetFile, data, { flag: 'w' }, (err) => {
      if (err) {
        console.log('failed :(');
        return;
      }
      console.log(`generate file '${targetFile}' successfully ✔️`);
    });
  });
};

copyFile(path.resolve(templatesPath, 'eslintconfig'), path.resolve(cwdPath, 'eslint.config.js'));
copyFile(path.resolve(templatesPath, 'prettierconfig'), path.resolve(cwdPath, 'prettier.config.js'));
