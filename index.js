import parse from './parsers.js';
import genDiff from './genDiff.js';

const runDiff = (filepath1, filepath2) => console.log(genDiff(parse(filepath1), parse(filepath2)));

export default runDiff;
