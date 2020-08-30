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
const expectedStylish = fs.readFileSync(getFixturePath('stylish'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('plain'), 'utf-8');
const expectedJSON = fs.readFileSync(getFixturePath('json.json'), 'utf-8');

describe.each([
  ['ini', getFixturePath('ini1.ini'), getFixturePath('ini2.ini')],
  ['json', getFixturePath('json1.json'), getFixturePath('json2.json')],
  ['yaml', getFixturePath('yaml1.yml'), getFixturePath('yaml2.yml')],
])('%s', (filetype, obj1, obj2) => {
  test.each([
    ['stylish', expectedStylish],
    ['plain', expectedPlain],
    ['json', expectedJSON],
  ])('%s', (format, result) => {
    expect(genDiff(obj1, obj2, format)).toEqual(result);
  });
});
