import fs from 'fs';
import path from 'path';
import genTree from './genTree.js';
import defineFormat from './formatters/index.js';
import getParser from './parsers.js';

const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');

const genDiff = (filepath1, filepath2, format) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const type = path.extname(filepath1).slice(1);
  const node1 = getParser(type)(data1);
  const node2 = getParser(type)(data2);
  return defineFormat(format)(genTree(node1, node2));
};

export default genDiff;
