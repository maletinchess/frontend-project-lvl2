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

export default parse;
