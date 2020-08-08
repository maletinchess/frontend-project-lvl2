import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import parse from '../parsers.js';
import getDiff from '../diff.js';
import stringifyDeepArray from '../formatter.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
/* eslint-disable no-underscore-dangle */
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const firstJson = parse(getFixturePath('recursive1.json'));
const secondJson = parse(getFixturePath('recursive2.json'));
const expectedFile = getFixturePath('expected_recursive.json');

test('getJsonDiffRecursive', () => {
  expect(stringifyDeepArray(getDiff(firstJson, secondJson))).toEqual(fs.readFileSync(expectedFile, 'utf-8'));
});
