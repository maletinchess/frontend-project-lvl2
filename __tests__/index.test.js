import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import parse from '../parsers.js';
import getdiff from '../diff.js';
import makeStylish from '../formatters/stylish.js';
import makePlain from '../formatters/plain.js';

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

const plain = [
  "Property 'common.follow' was added with value: false",
  "Property 'common.setting2' was removed",
  "Property 'common.setting3' was updated. From true to [complex value]",
  "Property 'common.setting4' was added with value: 'blah blah'",
  "Property 'common.setting5' was added with value: [complex value]",
  "Property 'common.setting6.doge.wow' was updated. From 'too much' to 'so much'",
  "Property 'common.setting6.ops' was added with value: 'vops'",
  "Property 'group1.baz' was updated. From 'bas' to 'bars'",
  "Property 'group1.nest' was updated. From [complex value] to 'str'",
  "Property 'group2' was removed",
  "Property 'group3' was added with value: [complex value]",
];

test('getJsonDiffStylish', () => {
  expect(`${makeStylish(diff, startPointLowScopeIndent)}\n`).toEqual(fs.readFileSync(expectedFile, 'utf-8'));
});

test('getJsonDiffPlain', () => {
  expect(makePlain(diff)).toEqual(plain.join('\n'));
});
