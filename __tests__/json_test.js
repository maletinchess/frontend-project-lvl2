import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import parse from '../parsers.js';
import getdiff from '../diff.js';
import makeStylish from '../formatters/stylish.js';
import makePlain from '../formatters/plain.js';
import { prepareData } from '../index.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
/* eslint-disable no-underscore-dangle */
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedStylish = fs.readFileSync(getFixturePath('expected_diff_stylish'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('expected_diff_plain'), 'utf-8');
const expectedJSON = fs.readFileSync(getFixturePath('expected_diff_json.json'), 'utf-8');

let diff;

/* global beforeAll, test, expect */
/* eslint no-undef: "error" */

beforeAll(() => {
  const data1 = prepareData(getFixturePath('json_deep1.json'), 'utf-8');
  const data2 = prepareData(getFixturePath('json_deep2.json'), 'utf-8');
  diff = getdiff(parse(data1), parse(data2));
});

test('json stylish', () => {
  expect(`${makeStylish(diff)}\n`).toEqual(expectedStylish);
});

test('json plain', () => {
  expect(`${makePlain(diff)}\n`).toEqual(expectedPlain);
});

test('json json', () => {
  expect(`${JSON.stringify(diff)}\n`).toEqual(expectedJSON);
});