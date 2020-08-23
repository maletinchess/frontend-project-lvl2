import _ from 'lodash';

const analizeKeyModification = (obj1, obj2, key) => {
  if (!_.has(obj1, key)) {
    return 'add';
  }
  if (!_.has(obj2, key)) {
    return 'removed';
  }
  if (!(_.isObject(obj1[key]) && _.isObject(obj2[key]))) {
    return (obj1[key] === obj2[key] ? 'unchanged' : 'changed');
  }
  return 'nested';
};

const getDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  const callback = (key) => {
    if (analizeKeyModification(obj1, obj2, key) === 'add') {
      return {
        name: `${key}`,
        stage: 'add',
        value: obj2[key],
        type: 'plain',
      };
    }
    if (analizeKeyModification(obj1, obj2, key) === 'removed') {
      return {
        name: `${key}`,
        stage: 'removed',
        value: obj1[key],
        type: 'plain',
      };
    }
    if (analizeKeyModification(obj1, obj2, key) === 'unchanged') {
      return {
        name: `${key}`,
        stage: 'unchanged',
        value: obj1[key],
        type: 'plain',
      };
    }
    if (analizeKeyModification(obj1, obj2, key) === 'changed') {
      return {
        name: `${key}`,
        stage: 'updated',
        value: { before: obj1[key], after: obj2[key] },
        type: 'plain',
      };
    }
    return {
      name: `${key}`,
      stage: 'deep',
      children: getDiff(obj1[key], obj2[key]),
      type: 'node',
    };
  };
  return keys.map((key) => callback(key));
};

export default getDiff;
