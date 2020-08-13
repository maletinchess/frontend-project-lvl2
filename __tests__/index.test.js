import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import parse from '../parsers.js';
import getdiff from '../get_differs/ast2.js';
import makeStylish from '../get_differs/formatterast1.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
/* eslint-disable no-underscore-dangle */
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const firstJson = parse(getFixturePath('recursive1.json'));
const secondJson = parse(getFixturePath('recursive2.json'));
const expectedFile = getFixturePath('expected_recursive.json');
const diff = getdiff(firstJson, secondJson);
const startPointLowScopeIndent = 0;

test('getJsonDiffRecursive', () => {
  expect(`${makeStylish(diff, startPointLowScopeIndent)}\n`).toEqual(fs.readFileSync(expectedFile, 'utf-8'));
});
