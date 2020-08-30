import fs from 'fs';
import path from 'path';
import genTree from './genTree.js';
import defineFormat from './formatters/index.js';
import getParser from './parsers.js';

const genDiff = (filepath1, filepath2, format) => {
  const data1 = fs.readFileSync(filepath1, 'utf8');
  const data2 = fs.readFileSync(filepath2, 'utf8');
  const type = path.extname(filepath1).slice(1);
  const node1 = getParser(type)(data1);
  const node2 = getParser(type)(data2);
  const diff = genTree(node1, node2);
  return defineFormat(format)(diff);
};

export default genDiff;
