import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import parse from '../src/parsers.js';
import getDiff from '../src/diff.js';
import makeStylish from '../formatters/stylish.js';
import makePlain from '../formatters/plain.js';
import { prepareData } from '../src/index.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
/* eslint-disable no-underscore-dangle */
const __dirname = dirname(__filename);

/* global describe, test, expect */
/* eslint no-undef: "error" */

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedStylish = fs.readFileSync(getFixturePath('expected_diff_stylish'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('expected_diff_plain'), 'utf-8');
const expectedJSON = fs.readFileSync(getFixturePath('expected_diff_json.json'), 'utf-8');

const dataIni1 = prepareData(getFixturePath('ini1.ini'), 'utf-8');
const dataIni2 = prepareData(getFixturePath('ini2.ini'), 'utf-8');
const dataJson1 = prepareData(getFixturePath('json1.json'), 'utf-8');
const dataJson2 = prepareData(getFixturePath('json2.json'), 'utf-8');
const dataYaml1 = prepareData(getFixturePath('yaml1.yml'), 'utf-8');
const dataYaml2 = prepareData(getFixturePath('yaml2.yml'), 'utf-8');

describe.each([
  [parse(dataIni1), parse(dataIni2)],
  [parse(dataJson1), parse(dataJson2)],
  [parse(dataYaml1), parse(dataYaml2)],
])('.style test', (obj1, obj2) => {
  test('stylish', () => {
    expect(`${makeStylish(getDiff(obj1, obj2))}\n`).toEqual(expectedStylish);
  });
  test('plain', () => {
    expect(`${makePlain(getDiff(obj1, obj2))}\n`).toEqual(expectedPlain);
  });
  test('JSON', () => {
    expect(`${JSON.stringify(getDiff(obj1, obj2))}\n`).toEqual(expectedJSON);
  });
});
