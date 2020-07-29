import _ from 'lodash';
import parse from './parsers.js';
import genDiff from './genDiff.js';

const rec1 = parse('/home/pavel/frontend-project-lvl2/__fixtures__/recursive1.json');
const rec2 = parse('/home/pavel/frontend-project-lvl2/__fixtures__/recursive2.json');
const flatJson1 = parse('/home/pavel/frontend-project-lvl2/__fixtures__/file1.json');
const flatJson2 = parse('/home/pavel/frontend-project-lvl2/__fixtures__/file2.json');
const partjs1 = parse('/home/pavel/frontend-project-lvl2/__fixtures__/partjson1.json');
const partjs2 = parse('/home/pavel/frontend-project-lvl2/__fixtures__/partjson2.json');

const getKeys = (flat1, flat2) => {
  const keys = [flat1, flat2];
  return _.uniq(keys.map((item) => Object.keys(item)).flat());
};

const isValueObject = (obj, key) => (typeof (obj[key]) === 'object' && !Array.isArray(obj[key]));
const isValuesObject = (obj1, obj2, key) => (isValueObject(obj1, key) && isValueObject(obj2, key));

const recursive = (tree1, tree2) => {
  const keys = getKeys(tree1, tree2);

  const getKeyValueView = (acc, key) => {
    const isEqual = (_.has(tree1, key)
    && _.has(tree2, key)
    && (tree1[key] === tree2[key]));
    const isChanged = (_.has(tree1, key)
    && _.has(tree2, key)
    && (tree1[key] !== tree2[key]));
    const isRemoved = (_.has(tree1, key) && !_.has(tree2, key));
    const isAdd = (!_.has(tree1, key) && _.has(tree2, key));
    if (isEqual) {
      acc.push([`  ${key}`, typeof (tree1[key]) === 'object' ? Object.entries(tree1[key]).flat() : `${tree1[key]}`]);
    }
    if (isRemoved) {
      acc.push([`- ${key}`, typeof (tree1[key]) === 'object' ? Object.entries(tree1[key]).flat() : `${tree1[key]}`]);
    }
    if (isAdd) {
      acc.push([`+ ${key}`, typeof (tree2[key]) === 'object' ? Object.entries(tree2[key]).flat() : `${tree2[key]}`]);
    }
    if (isChanged) {
      acc.push([`- ${key}`, typeof (tree1[key]) === 'object' ? Object.entries(tree1[key]).flat() : `${tree1[key]}`]);
      acc.push([`+ ${key}`, typeof (tree2[key]) === 'object' ? Object.entries(tree2[key]).flat() : `${tree2[key]}`]);
    }
    return acc;
  };

  const noChildKeys = keys.filter((key) => !isValuesObject(tree1, tree2, key));
  const noChild = noChildKeys.reduce(getKeyValueView, []);

  if (noChildKeys.length === keys.length) {
    return noChild;
  }

  const child = keys.filter((key) => isValuesObject(tree1, tree2, key))
    .map((key) => [key, tree1[key], tree2[key]])
    .map((item) => {
      const [key, value1, value2] = item;
      return [key, recursive(value1, value2)];
    });
  return child.concat(noChild);
};
const diff = recursive(rec1, rec2);

const valueIsOneString = ['key1', ['x', 'y']];
const valueIsArr = ['set', [[' key', 'value'], ['+ ops', 'vops'], ['  alpha', 'beta']]];
const valueIsDeep = ['xxx', ['key1', ['x', 'y']]];

const isString = (value) => typeof (value) === 'string';
const isFlatKeyValuePair = (value) => {
  const stringElements = value.filter((item) => isString(item));
  return stringElements.length === value.length;
};
const isArrayOfKeyValuePairs = (value) => {
  const arrayElements = value.filter((item) => Array.isArray(item) && isFlatKeyValuePair(item));
  return arrayElements.length === value.length;
};

const readyToFormat = ([, value]) => (isString(value)
 || isFlatKeyValuePair(value)
 || isArrayOfKeyValuePairs(value));

const makeFormat = (pair) => {
  const [key, value] = pair;
  const [innerKey, innerValue] = value;
  if (readyToFormat(pair) && isFlatKeyValuePair(pair)) {
    return `{\n   ${key}: {\n     ${innerKey}: ${innerValue}\n   }\n}`;
  }
  if (readyToFormat(pair) && isArrayOfKeyValuePairs(value)) {
    const prepared = value.map((item) => `${item[0]}: ${item[1]}`);
    return `{\n   ${key}: {\n     ${prepared.join('\n    ')}\n   }\n}`;
  }
  return 'notReadyToFormat';
};

console.log(diff);
console.log('\n\n');
console.log(isString(valueIsOneString[0]));
console.log(isFlatKeyValuePair(valueIsOneString[1]));
console.log(isFlatKeyValuePair(valueIsArr[1]));
console.log(isArrayOfKeyValuePairs(valueIsDeep[1]));
console.log(isArrayOfKeyValuePairs(valueIsArr[1]));
console.log('\n\n');
console.log(readyToFormat(valueIsOneString));
console.log(readyToFormat(valueIsArr));
console.log(readyToFormat(valueIsDeep));
console.log('\n\n');
console.log(makeFormat(valueIsArr));
console.log(makeFormat(diff[1]));
