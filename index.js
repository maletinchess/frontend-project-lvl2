import parse from './parsers.js';
import getdiff from './get_differs/ast2.js';

const genDiff = (filepath1, filepath2, format) => {
  if (format === 'stylish') {
    console.log(getdiff(parse(filepath1), parse(filepath2)));
  }
  if (format === 'xxx') {
    console.log('xxx!!');
  }
};

export default genDiff;
