import { isFlat, isFormatable } from './utils.js';

const indentSymbol = '  ';

const stringifyPair = (pair) => `${pair[0]}: ${pair[1]}`;
const stringifyFormatable = (pair, counter) => {
  const [key, value] = pair;
  const indentHigh = indentSymbol.repeat(counter);
  const indentLow = indentSymbol.repeat(counter - 1);
  const getFrame = (item) => `{\n${indentHigh}${item}\n${indentLow}}`;
  if (isFlat(pair)) {
    return stringifyPair(pair);
  }
  if (isFlat(value)) {
    return stringifyPair([key, getFrame(stringifyPair(value))]);
  }
  const modifiedValue = value.map((item) => `${item[0]}: ${item[1]}`).join(`\n${indentHigh}`);
  return stringifyPair([key, getFrame(modifiedValue)]);
};

const stringifyDeepKey = (pair) => {
  const iter = (node, counter) => {
    const [key, value] = node;
    const indentHigh = indentSymbol.repeat(counter);
    const indentLow = indentSymbol.repeat(counter - 1);
    if (isFormatable(node)) {
      return stringifyFormatable(node, counter);
    }
    if (typeof (value[0]) === 'string') {
      const modifiedValue = iter(value, counter + 2);
      return stringifyPair([key, `{\n${indentHigh}${modifiedValue}\n${indentLow}}`]);
    }
    const modifiedValueArray = value.map((item) => iter(item, counter + 2));
    return stringifyPair(([key, `{\n${indentHigh}${modifiedValueArray.join(`\n${indentHigh}`)}\n${indentLow}}`]));
  };
  return iter(pair, 3);
};

const stringifyDeepArray = (array) => {
  const arrayModified = array.map((pair) => stringifyDeepKey(pair)).join(`\n${indentSymbol}`);
  return `{\n${indentSymbol}${arrayModified}\n}\n`;
};

export default stringifyDeepArray;
