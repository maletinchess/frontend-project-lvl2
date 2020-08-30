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
  ['ini', 'ini1.ini', 'ini2.ini'],
  ['json', 'json1.json', 'json2.json'],
  ['yaml', 'yaml1.yml', 'yaml2.yml'],
])(' test genDiff filetype %s ', (filetype, filename1, filename2) => {
  test.each([
    ['stylish', getFixturePath(filename1), getFixturePath(filename2), fs.readFileSync(getFixturePath('stylish'), 'utf-8')],
    ['plain', getFixturePath(filename1), getFixturePath(filename2), fs.readFileSync(getFixturePath('plain'), 'utf-8')],
    ['json', getFixturePath(filename1), getFixturePath(filename2), fs.readFileSync(getFixturePath('json.json'), 'utf-8')],
  ])('format %s', (format, filepath1, filepath2, result) => {
    expect(genDiff(filepath1, filepath2, format)).toEqual(result);
  });
});
