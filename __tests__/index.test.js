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

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getPath1 = (filetype) => getFixturePath(`${filetype}1.${filetype}`);
const getPath2 = (filetype) => getFixturePath(`${filetype}2.${filetype}`);
const getExpected = (format) => fs.readFileSync(getFixturePath(format)).toString();
const extensions = ['ini', 'json', 'yml'];
const formats = ['stylish', 'plain', 'json'];

describe.each(extensions)(' test genDiff filetype %s ', (filetype) => {
  test.each(formats)('format %s', (format) => {
    const filepath1 = getPath1(filetype);
    const filepath2 = getPath2(filetype);
    const expected = getExpected(format);
    expect(genDiff(filepath1, filepath2, format)).toEqual(expected);
  });
});
