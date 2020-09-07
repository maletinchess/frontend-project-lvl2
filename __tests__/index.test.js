import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
/* eslint-disable no-underscore-dangle */
const __dirname = dirname(__filename);

/* global describe, test, expect */
/* eslint no-undef: "error" */

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe.each([
  ['ini'],
  ['json'],
  ['yml'],
])(' test genDiff filetype %s ', (filetype) => {
  test.each([
    ['stylish', getFixturePath(`${filetype}1.${filetype}`), getFixturePath(`${filetype}2.${filetype}`)],
    ['plain', getFixturePath(`${filetype}1.${filetype}`), getFixturePath(`${filetype}2.${filetype}`)],
    ['json', getFixturePath(`${filetype}1.${filetype}`), getFixturePath(`${filetype}2.${filetype}`)],
  ])('format %s', (format, filepath1, filepath2) => {
    expect(genDiff(filepath1, filepath2, format)).toEqual(fs.readFileSync(getFixturePath(format), 'utf-8'));
  });
});
