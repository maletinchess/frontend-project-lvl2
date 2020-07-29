import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys = _.uniq(Object.keys(obj1).concat(Object.keys(obj2)));

  const cb = (acc, key) => {
    const isNotChanged = (_.has(obj1, key) && _.has(obj2, key) && (obj1[key] === obj2[key]));
    const isChanged = (_.has(obj1, key) && _.has(obj2, key) && (obj1[key] !== obj2[key]));
    const isRemoved = (_.has(obj1, key) && !_.has(obj2, key));
    const isAdded = (!_.has(obj1, key) && _.has(obj2, key));
    if (isNotChanged) {
      acc.push([key, obj1[key]]);
    }
    if (isChanged) {
      acc.push([key, obj2[key]], [key, obj1[key]]);
    }
    if (isRemoved) {
      acc.push([key, obj1[key]]);
    }
    if (isAdded) {
      acc.push([key, obj2[key]]);
    }
    return acc;
  };
  const output = keys.reduce(cb, []);
  return output;
};

export default genDiff;
