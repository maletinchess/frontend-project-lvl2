import YAML from 'yaml';
import ini from 'ini';
import _ from 'lodash';

const isNumeric = (value) => !Number.isNaN(parseFloat(value));

const normalizeIni = (tree) => Object.entries(tree).reduce((acc, [key, value]) => {
  if (_.isObject(value)) {
    return { ...acc, [key]: normalizeIni(value) };
  }
  if (isNumeric(value)) {
    return { ...acc, [key]: Number(value) };
  }
  return { ...acc, [key]: value };
}, {});

const getParser = (type) => {
  switch (type) {
    case 'json':
      return JSON.parse;
    case 'yml':
      return YAML.parse;
    case 'ini':
      return _.flowRight(normalizeIni, ini.parse);
    default:
      throw new Error(`unknown ${type}`);
  }
};

export default getParser;
