import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import getJsonDiff from '../index';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
/* eslint-disable no-underscore-dangle */
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const firstJson = getFixturePath('file1.json');
const secondJson = getFixturePath('file2.json');
const expectedFile = getFixturePath('expected_file.json');

test('getJsonDiff', () => {
  expect(getJsonDiff(firstJson, secondJson)).toEqual(fs.readFileSync(expectedFile, 'utf-8'));
});
