import _ from 'lodash';
import parse from './parsers.js';

const getKeys = (flat1, flat2) => {
  const keys = [flat1, flat2];
  return _.uniq(keys.map((item) => Object.keys(item)).flat()).sort();
};

const isValueObject = (obj, key) => (typeof (obj[key]) === 'object' && !Array.isArray(obj[key]));
const isValuesObject = (obj1, obj2, key) => (isValueObject(obj1, key) && isValueObject(obj2, key));

const analizeStage = (obj1, obj2, key) => {
  if (!_.has(obj1, key)) {
    return 'add';
  }
  if (!_.has(obj2, key)) {
    return 'removed';
  }
  if (!isValuesObject(obj1, obj2, key)) {
    return (obj1[key] === obj2[key] ? 'unchanged' : 'changed');
  }
  return 'analize deep';
};

const getdiff = (tree1, tree2) => {
  const keys = getKeys(tree1, tree2);
  const callback = (acc, key) => {
    if (analizeStage(tree1, tree2, key) === 'add') {
      const diff = {};
      diff.name = `${key}`;
      diff.stage = 'add';
      diff.value = tree2[key];
      diff.type = 'plain';
      acc.push(diff);
    }
    if (analizeStage(tree1, tree2, key) === 'removed') {
      const diff = {};
      diff.name = `${key}`;
      diff.stage = 'removed';
      diff.value = tree1[key];
      diff.type = 'plain';
      acc.push(diff);
    }
    if (analizeStage(tree1, tree2, key) === 'unchanged') {
      const diff = {};
      diff.name = `${key}`;
      diff.stage = 'unchanged';
      diff.value = tree1[key];
      diff.type = 'plain';
      acc.push(diff);
    }
    if (analizeStage(tree1, tree2, key) === 'changed') {
      const diff = {};
      diff.name = `${key}`;
      diff.stage = 'updated';
      diff.value = { before: tree1[key], after: tree2[key] };
      diff.type = 'plain';
      acc.push(diff);
    }
    if (analizeStage(tree1, tree2, key) === 'analize deep') {
      const diff = {};
      diff.name = `${key}`;
      diff.stage = 'deep';
      diff.children = getdiff(tree1[key], tree2[key]);
      diff.type = 'node';
      acc.push(diff);
    }
    return acc;
  };
  return keys.reduce(callback, []);
};

const diffJson = getdiff(parse('/home/pavel/frontend-project-lvl2/__fixtures__/ini_deep1.ini'), parse('/home/pavel/frontend-project-lvl2/__fixtures__/ini_deep2.ini'));
console.log(JSON.stringify(diffJson, null, 2));
console.log(diffJson);

export default getdiff;
