import _ from 'lodash';

const getKeys = (flat1, flat2) => {
  const keys = [flat1, flat2];
  return _.uniq(keys.map((item) => Object.keys(item)).flat()).sort();
};

const isValueObject = (obj, key) => (typeof (obj[key]) === 'object' && !Array.isArray(obj[key]));
const areValuesObject = (obj1, obj2, key) => (isValueObject(obj1, key) && isValueObject(obj2, key));

const analizeKeyModification = (obj1, obj2, key) => {
  if (!_.has(obj1, key)) {
    return 'add';
  }
  if (!_.has(obj2, key)) {
    return 'removed';
  }
  if (!areValuesObject(obj1, obj2, key)) {
    return (obj1[key] === obj2[key] ? 'unchanged' : 'changed');
  }
  return 'analize deep';
};

const getDiff = (tree1, tree2) => {
  const keys = getKeys(tree1, tree2);
  const callback = (acc, key) => {
    if (analizeKeyModification(tree1, tree2, key) === 'add') {
      const diff = {};
      diff.name = `${key}`;
      diff.stage = 'add';
      diff.value = tree2[key];
      diff.type = 'plain';
      acc.push(diff);
    }
    if (analizeKeyModification(tree1, tree2, key) === 'removed') {
      const diff = {};
      diff.name = `${key}`;
      diff.stage = 'removed';
      diff.value = tree1[key];
      diff.type = 'plain';
      acc.push(diff);
    }
    if (analizeKeyModification(tree1, tree2, key) === 'unchanged') {
      const diff = {};
      diff.name = `${key}`;
      diff.stage = 'unchanged';
      diff.value = tree1[key];
      diff.type = 'plain';
      acc.push(diff);
    }
    if (analizeKeyModification(tree1, tree2, key) === 'changed') {
      const diff = {};
      diff.name = `${key}`;
      diff.stage = 'updated';
      diff.value = { before: tree1[key], after: tree2[key] };
      diff.type = 'plain';
      acc.push(diff);
    }
    if (analizeKeyModification(tree1, tree2, key) === 'analize deep') {
      const diff = {};
      diff.name = `${key}`;
      diff.stage = 'deep';
      diff.children = getDiff(tree1[key], tree2[key]);
      diff.type = 'node';
      acc.push(diff);
    }
    return acc;
  };
  return keys.reduce(callback, []);
};

export default getDiff;
