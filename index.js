import parse from './parsers.js';
import getDiff from './diff.js';
import stringifyDeepArray from './formatter.js';

const genDiff = (filepath1, filepath2, format) => {
  if (format === 'stylish') {
    console.log(stringifyDeepArray(getDiff(parse(filepath1), parse(filepath2))));
  }
  if (format === 'xxx') {
    console.log('xxx!!');
  }
};

export default genDiff;
