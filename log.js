import parse from './parsers.js';
import getDiff, { analizeStage } from './diff.js';
import stringifyDeepArray from './formatter.js';

const isValueObject = (obj, key) => (typeof (obj[key]) === 'object' && !Array.isArray(obj[key]));
const isValuesObject = (obj1, obj2, key) => (isValueObject(obj1, key) && isValueObject(obj2, key));

const rec1 = parse('/home/pavel/frontend-project-lvl2/__fixtures__/recursive1.json');
const rec2 = parse('/home/pavel/frontend-project-lvl2/__fixtures__/recursive2.json');

const diff = getDiff(rec1, rec2);
const common = diff[0];

const x1 = Object.values(rec1);
const x2 = Object.values(rec2);

console.log(analizeStage(rec1, rec2, 'common'));
console.log(isValuesObject(rec1, rec2, 'common'));

const ex1 = ['key', 'value'];
const ex2 = [['alph1a', 'beta1'], ['alpha2', 'beta2']];
const ex3 = ['gamma', ['gamma6', 'sigma']];
const ex4 = ['delta3', [['alpha1', 'beta1'], ['first', 'second']]];
const ex5 = [['gamma', ['gamma6', 'sigma']], ['lester', 'trust']];
const ex6 = ['delta3', [['alpha1', 'beta1'], ['tyuring', ['first', 'second']]]];

const test = {
  group3: {
    fee: 100500,
    deep: {
      id: { number: 45 },
    },
  },
};

const indent = '  ';

const stringifyObject = (obj) => {
  const transformed = Object.entries(obj);
  return transformed.map((item) => {
    if (typeof (item[1]) !== 'object') {
      return `{\n${indent}${item[0]}: ${item[1]}\n}`;
    }
    return `{\n${indent.repeat(2)}${item[0]}: ${stringifyObject(item[1])}\n}`;
  }).join('\n');
};

console.log(stringifyObject(test));

const testdiff = stringifyDeepArray(diff);
