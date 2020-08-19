import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import ini from 'ini';
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

const data1 = prepareData('/home/pavel/frontend-project-lvl2/__fixtures__/ini_deep2.ini');
const transformedData = parse(data1);
console.log(transformedData);
