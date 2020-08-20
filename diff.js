import _ from 'lodash';

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

const getDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  const callback = (acc, key) => {
    if (analizeKeyModification(obj1, obj2, key) === 'add') {
      const diff = {};
      diff.name = `${key}`;
      diff.stage = 'add';
      diff.value = obj2[key];
      diff.type = 'plain';
      acc.push(diff);
    }
    if (analizeKeyModification(obj1, obj2, key) === 'removed') {
      const diff = {};
      diff.name = `${key}`;
      diff.stage = 'removed';
      diff.value = obj1[key];
      diff.type = 'plain';
      acc.push(diff);
    }
    if (analizeKeyModification(obj1, obj2, key) === 'unchanged') {
      const diff = {};
      diff.name = `${key}`;
      diff.stage = 'unchanged';
      diff.value = obj1[key];
      diff.type = 'plain';
      acc.push(diff);
    }
    if (analizeKeyModification(obj1, obj2, key) === 'changed') {
      const diff = {};
      diff.name = `${key}`;
      diff.stage = 'updated';
      diff.value = { before: obj1[key], after: obj2[key] };
      diff.type = 'plain';
      acc.push(diff);
    }
    if (analizeKeyModification(obj1, obj2, key) === 'analize deep') {
      const diff = {};
      diff.name = `${key}`;
      diff.stage = 'deep';
      diff.children = getDiff(obj1[key], obj2[key]);
      diff.type = 'node';
      acc.push(diff);
    }
    return acc;
  };
  return keys.reduce(callback, []);
};

export default getDiff;
