import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import parse from '../parsers.js';
import genDiff from '../genDiff';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
/* eslint-disable no-underscore-dangle */
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const firstJson = parse(getFixturePath('recursive1.json'));
const secondJson = parse(getFixturePath('recursive22.json'));
const expectedFile = getFixturePath('expected_recursive.json');

const firstYaml = parse(getFixturePath('file1.yml'));
const secondYaml = parse(getFixturePath('file2.yml'));
const expectedYaml = getFixturePath('expected_file.yml');

const firstIni = parse(getFixturePath('file1.ini'));
const secondIni = parse(getFixturePath('file2.ini'));
const expectedIni = getFixturePath('expected_file.ini');

test('getJsonDiff', () => {
  expect(genDiff(firstJson, secondJson)).toEqual(fs.readFileSync(expectedFile, 'utf-8'));
});

test('yaml', () => {
  expect(genDiff(firstYaml, secondYaml)).toEqual(fs.readFileSync(expectedYaml, 'utf-8'));
});

test('ini', () => {
  expect(genDiff(firstIni, secondIni)).toEqual(fs.readFileSync(expectedIni, 'utf-8'));
});
