import _ from 'lodash';
import parse from '../parsers.js';

const rec1 = parse('/home/pavel/frontend-project-lvl2/__fixtures__/recursive1.json');
const rec2 = parse('/home/pavel/frontend-project-lvl2/__fixtures__/recursive2.json');

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
  return keys.map((key) => {
    const diff = {};
    if (analizeStage(tree1, tree2, key) === 'add') {
      diff.name = `${key}`;
      diff.stage = 'add';
      diff.value = tree2[key];
      diff.type = 'plain';
      return diff;
    }
    if (analizeStage(tree1, tree2, key) === 'removed') {
      diff.name = `${key}`;
      diff.stage = 'removed';
      diff.value = tree1[key];
      diff.type = 'plain';
      return diff;
    }
    if (analizeStage(tree1, tree2, key) === 'unchanged') {
      diff.name = `${key}`;
      diff.stage = 'unchanged';
      diff.value = tree1[key];
      diff.type = 'plain';
      return diff;
    }
    if (analizeStage(tree1, tree2, key) === 'changed') {
      diff.name = `${key}`;
      diff.stage = 'unchanged';
      diff.value = ['value before', tree1[key], 'value after', tree2[key]];
      diff.type = 'plain';
      return diff;
    }
    diff.name = `${key}`;
    diff.stage = 'unchanged';
    diff.children = getdiff(tree1[key], tree2[key]);
    diff.type = 'node';
    return diff;
  });
};

const diff = getdiff(rec1, rec2);
console.log(diff);
