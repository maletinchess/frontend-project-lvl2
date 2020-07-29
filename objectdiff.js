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

const isValueObject = (obj, key) => (typeof (obj[key]) === 'object');
const isValuesObject = (obj1, obj2, key) => (isValueObject(obj1, key) && isValueObject(obj2, key));

const isEqual = (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key) && (obj1[key] === obj2[key]));
const isChanged = (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key) && (obj1[key] !== obj2[key]));
const isRemoved = (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key));
const isAdd = (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key));

const recursive = (tree1, tree2) => {
  const keys = getKeys(tree1, tree2);

  const getKeyValueView = (acc, key) => {
    if (isEqual(tree1, tree2, key)) {
      acc[`  ${key}`] = tree1[key];
    }
    if (isRemoved(tree1, tree2, key)) {
      acc[`- ${key}`] = tree1[key];
    }
    if (isAdd(tree1, tree2, key)) {
      acc[`+ ${key}`] = tree2[key];
    }
    if (isChanged(tree1, tree2, key)) {
      acc[`+ ${key}`] = tree1[key];
      acc[`- ${key}`] = tree2[key];
    }
    return acc;
  };

  const noChildrenKeys = keys.filter((key) => !isValuesObject(tree1, tree2, key));
  const diff = noChildrenKeys.reduce(getKeyValueView, {});
  if (noChildrenKeys.length === keys.length) {
    return diff;
  }

  const children = keys.filter((key) => isValuesObject(tree1, tree2, key));

  const cb = (acc, key) => {
    acc[key] = recursive(tree1[key], tree2[key]);
    return acc;
  };
  return children.reduce(cb, diff);
};

const diff = recursive(rec1, rec2);

console.log(diff);
