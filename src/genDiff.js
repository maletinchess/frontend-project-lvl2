import fs from 'fs';
import path from 'path';
import genTree from './genTree.js';
import getRender from './formatters/index.js';
import getParser from './parsers.js';

const getData = (filepath) => {
  const filetype = path.extname(filepath).slice(1);
  const data = getParser(filetype)(fs.readFileSync(filepath).toString());
  return data;
};

const genDiff = (filepath1, filepath2, format) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const render = getRender(format);
  const ast = genTree(data1, data2);
  const diffOutput = render(ast);
  return diffOutput;
};

export default genDiff;
