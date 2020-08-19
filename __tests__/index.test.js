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

const firstJson = parse(getFixturePath('json_deep1.json'));
const secondJson = parse(getFixturePath('json_deep2.json'));
const diffJson = getdiff(firstJson, secondJson);
const firstIni = parse(getFixturePath('ini_deep1.ini'));
const secondIni = parse(getFixturePath('ini_deep2.ini'));
const diffIni = getdiff(firstIni, secondIni);
const firstYaml = parse(getFixturePath('yaml_deep1.yml'));
const secondYaml = parse(getFixturePath('yaml_deep2.yml'));
const diffYaml = getdiff(firstYaml, secondYaml);
const expectedStylish = fs.readFileSync(getFixturePath('expected_diff_stylish'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('expected_diff_plain'), 'utf-8');
const expectedJSON = fs.readFileSync(getFixturePath('expected_diff_json.json'), 'utf-8');

test('getJsonDiffStylish', () => {
  expect(`${makeStylish(diffJson)}\n`).toEqual(expectedStylish);
});

test('getJsonDiffPlain', () => {
  expect(`${makePlain(diffJson)}\n`).toEqual(expectedPlain);
});

test('getJsonDiffJSON', () => {
  expect(`${JSON.stringify(diffJson)}\n`).toEqual(expectedJSON);
});

test('getIniDiffStylish', () => {
  expect(`${makeStylish(diffIni)}\n`).toEqual(expectedStylish);
});

test('getIniDiffPlain', () => {
  expect(`${makePlain(diffIni)}\n`).toEqual(expectedPlain);
});

test('getIniDiffJSON', () => {
  expect(`${JSON.stringify(diffIni)}\n`).toEqual(expectedJSON);
});

test('getYamlDiffStylish', () => {
  expect(`${makeStylish(diffYaml)}\n`).toEqual(expectedStylish);
});

test('getYamlDiffPlain', () => {
  expect(`${makePlain(diffYaml)}\n`).toEqual(expectedPlain);
});

test('getYamlDiffJSON', () => {
  expect(`${JSON.stringify(diffYaml)}\n`).toEqual(expectedJSON);
});
