#!/usr/bin/env node

import program from 'commander';
import getJsonDiff from '../src/index.js';

program
  .version('0.0.1')
  .description('An application for pizzas ordering')
  .action(getJsonDiff)
  .option('-f, --format[type]', 'output format')
  .parse(process.argv);
