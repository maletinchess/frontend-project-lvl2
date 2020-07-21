#!/usr/bin/env node

import program from 'commander';
import getJsonDiff from '../index.js';

program
  .version('0.0.1')
  .description('An application for pizzas ordering')
  .arguments('<filepath1> <filepath2>')
  .action(getJsonDiff)
  .option('-f, --format[type]', 'output format')
  .parse(process.argv);
