import _ from 'lodash';

const genTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();
  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        name: `${key}`,
        type: 'add',
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        name: `${key}`,
        type: 'removed',
        value: data1[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        name: `${key}`,
        type: 'nested',
        children: genTree(data1[key], data2[key]),
      };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return {
        name: `${key}`,
        type: 'unchanged',
        value: data1[key],
      };
    }
    return {
      name: `${key}`,
      type: 'updated',
      valueBefore: data1[key],
      valueAfter: data2[key],
    };
  });
};

export default genTree;
