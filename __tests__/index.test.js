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

const firstJson = parse(getFixturePath('file1.json'));
const secondJson = parse(getFixturePath('file2.json'));
const expectedFile = getFixturePath('expected_file.json');

const firstYaml = parse(getFixturePath('file1.yml'));
const secondYaml = parse(getFixturePath('file2.yml'));
const expectedYaml = getFixturePath('expeted_file.yml');

test('getJsonDiff', () => {
  expect(genDiff(firstJson, secondJson)).toEqual(fs.readFileSync(expectedFile, 'utf-8'));
});

test('yaml', () => {
  expect(genDiff(firstYaml, secondYaml)).toEqual(fs.readFileSync(expectedYaml, 'utf-8'));
});
