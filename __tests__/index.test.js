import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
/* eslint-disable no-underscore-dangle */
const __dirname = dirname(__filename);

/* global describe, test, expect */
/* eslint no-undef: "error" */

const extensions = ['ini', 'json', 'yml'];
const formats = ['stylish', 'plain', 'json'];

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getPath = (filetype, number) => getFixturePath(`${filetype}${number}.${filetype}`);

const getExpected = (format) => fs.readFileSync(getFixturePath(format)).toString();

describe.each(extensions)(' test genDiff filetype %s ', (filetype) => {
  test.each(formats)('format %s', (format) => {
    const filepath1 = getPath(filetype, 1);

    const filepath2 = getPath(filetype, 2);

    const expected = getExpected(format);

    expect(genDiff(filepath1, filepath2, format)).toEqual(expected);
  });
});
