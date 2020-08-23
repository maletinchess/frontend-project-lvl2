#!/usr/bin/env node

import program from 'commander';
import getOutput from '../src/index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const output = getOutput(filepath1, filepath2, program.format);
    console.log(output);
  });

program.parse(process.argv);
