import parse from './parsers.js';
import recursive from './arraydiff.js';

const rec1 = parse('/home/pavel/frontend-project-lvl2/__fixtures__/recursive1.json');
const rec2 = parse('/home/pavel/frontend-project-lvl2/__fixtures__/recursive2.json');

const diff = recursive(rec1, rec2);
const common = diff[0];

const ex1 = ['key', 'value'];
const ex2 = [['alph1a', 'beta1'], ['alpha2', 'beta2']];
const ex3 = ['gamma', ['gamma6', 'sigma']];
const ex4 = ['delta3', [['alpha1', 'beta1'], ['first', 'second']]];
const ex5 = [['gamma', ['gamma6', 'sigma']], ['lester', 'trust']];
const ex6 = ['delta3', [['alpha1', 'beta1'], ['tyuring', ['first', 'second']]]];

const isFlat = (pair) => {
  const [key, value] = pair;
  return pair.length === 2
  && typeof (key) === 'string'
  && !Array.isArray(value)
  && Array.isArray(pair);
};

const isFlatArray = (flats) => {
  if (typeof (flats) === 'string') {
    return false;
  }
  const arrayForCheck = flats.filter((flat) => Array.isArray(flat))
    .filter((flat) => isFlat(flat));
  return arrayForCheck.length === flats.length;
};

const isFormatable = (pair) => {
  const [key, value] = pair;
  return typeof (key) === 'string'
  && (isFlat(pair) || isFlat(value) || isFlatArray(value));
};

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
console.log(stringifyFormatable(ex4, 1));

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
console.log(diff);

const stringifyDeepArray = (array) => {
  const arrayModified = array.map((pair) => stringifyDeepKey(pair)).join(`\n${indentSymbol}`);
  return `{\n${indentSymbol}${arrayModified}\n}`;
};
console.log(stringifyDeepArray(diff));
