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
    ['stylish', getFixturePath(`${filetype}1.${filetype}`), getFixturePath(`${filetype}2.${filetype}`), fs.readFileSync(getFixturePath('stylish'), 'utf-8')],
    ['plain', getFixturePath(`${filetype}1.${filetype}`), getFixturePath(`${filetype}2.${filetype}`), fs.readFileSync(getFixturePath('plain'), 'utf-8')],
    ['json', getFixturePath(`${filetype}1.${filetype}`), getFixturePath(`${filetype}2.${filetype}`), fs.readFileSync(getFixturePath('json.json'), 'utf-8')],
  ])('format %s', (format, filepath1, filepath2, result) => {
    expect(genDiff(filepath1, filepath2, format)).toEqual(result);
  });
});
