import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import ini from 'ini';
import _ from 'lodash';

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const isValueStringifiedNumber = (value) => {
  if (typeof (value) === 'boolean') {
    return false;
  }
  const numbersQuantity = value.split('').filter((symbol) => numbers.includes(symbol));
  return numbersQuantity.length === value.length;
};

const restoreNumber = (str) => Number.parseInt(str, 10);

export const restore = (obj) => {
  const keys = _.keys(obj);
  const cb = (acc, key) => {
    if (typeof obj[key] !== 'object') {
      if (isValueStringifiedNumber(obj[key])) {
        acc[key] = restoreNumber(obj[key]);
      } else {
        acc[key] = obj[key];
      }
    } else {
      acc[key] = restore(obj[key]);
    }
    return acc;
  };
  return keys.reduce(cb, {});
};

const parse = (filepath) => {
  const format = path.extname(filepath).slice(1);
  switch (format) {
    case 'json':
      return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    case 'yml':
      return YAML.parse(fs.readFileSync(filepath, 'utf8'));
    case 'ini':
      return restore(ini.parse(fs.readFileSync(filepath, 'utf8')));
    default:
      throw new Error(`unknown ${format}`);
  }
};

export default parse;
