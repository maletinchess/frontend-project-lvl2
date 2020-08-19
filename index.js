import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import ini from 'ini';
import getdiff from './diff.js';
import defineFormat from './formatters/index.js';
import { restore } from './parsers.js';

const prepareData = (filepath) => {
  const format = path.extname(filepath).slice(1);
  const data = fs.readFileSync(filepath, 'utf-8');
  return [format, data];
};

const parse = (data) => {
  const [format, content] = data;
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
      return YAML.parse(content);
    case 'ini':
      return restore(ini.parse(content));
    default:
      throw new Error(`unknown ${format}`);
  }
};

const genDiff = (filepath1, filepath2, format) => {
  const data1 = prepareData(filepath1);
  const data2 = prepareData(filepath2);
  const node1 = parse(data1);
  const node2 = parse(data2);
  const diff = getdiff(node1, node2);
  const makeFormat = defineFormat(format);
  console.log(makeFormat(diff));
};

export default genDiff;
