import fs from 'fs';
import getJsonDiff from '../index';

const firstJson = '/home/pavel/frontend-project-lvl2/__fixtures__/file1.json';
const secondJson = '/home/pavel/frontend-project-lvl2/__fixtures__/file2.json';
const expectedFile = '/home/pavel/frontend-project-lvl2/__fixtures__/expected_file.json';

test('getJsonDiff', () => {
  expect(getJsonDiff(firstJson, secondJson)).toEqual(fs.readFileSync(expectedFile, 'utf-8'));
});
