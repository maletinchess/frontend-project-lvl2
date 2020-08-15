import parse from './parsers.js';
import getdiff from './diff.js';
import getFormat from './formatters/index.js';

const genDiff = (filepath1, filepath2, format) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  const diff = getdiff(file1, file2);
  const formatter = getFormat(format);
  console.log(formatter(diff));
};

export default genDiff;
