import _ from 'lodash';

const genTree = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  const callback = (key) => {
    if (!_.has(obj1, key)) {
      return {
        name: `${key}`,
        type: 'add',
        value: obj2[key],
      };
    }
    if (!_.has(obj2, key)) {
      return {
        name: `${key}`,
        type: 'removed',
        value: obj1[key],
      };
    }
    if (!(_.isObject(obj1[key]) && _.isObject(obj2[key]))) {
      return (obj1[key] === obj2[key]
        ? {
          name: `${key}`,
          type: 'unchanged',
          value: obj1[key],
        }
        : {
          name: `${key}`,
          type: 'updated',
          valueBefore: obj1[key],
          valueAfter: obj2[key],
        });
    }
    return {
      name: `${key}`,
      type: 'nested',
      children: genTree(obj1[key], obj2[key]),
    };
  };
  return keys.map((key) => callback(key));
};

export default genTree;
