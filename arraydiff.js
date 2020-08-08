import _ from 'lodash';

const getKeys = (flat1, flat2) => {
  const keys = [flat1, flat2];
  return _.uniq(keys.map((item) => Object.keys(item)).flat());
};

const isValueObject = (obj, key) => (typeof (obj[key]) === 'object' && !Array.isArray(obj[key]));
const isValuesObject = (obj1, obj2, key) => (isValueObject(obj1, key) && isValueObject(obj2, key));

const isFlatPair = (pair) => {
  const [key, value] = pair;
  return pair.length === 2
  && Array.isArray(pair)
  && typeof (key) === 'string'
  && typeof (value) !== 'object';
};

const normalized = (array) => {
  const check = array.filter((item) => isFlatPair(item));
  return check.length === array.length;
};

const format = (pairs) => pairs.map((pair) => {
  const [key, value] = pair;
  return [`  ${key}`, `${value}`];
});

const normalizeObject = (object) => {
  const arr = Object.entries(object);
  if (normalized(arr)) {
    return format(arr);
  }
  const arrDeep = arr.map((item) => (isFlatPair(item) ? [`  ${item[0]}`, `${item[1]}`] : [`  ${item[0]}`, normalizeObject(item[1])]));
  return arrDeep;
};

const genDiffDeep = (tree1, tree2) => {
  const keys = getKeys(tree1, tree2);

  const getKeyValueView = (acc, key) => {
    const isEqual = (_.has(tree1, key)
    && _.has(tree2, key)
    && (tree1[key] === tree2[key]));
    const isChanged = (_.has(tree1, key)
    && _.has(tree2, key)
    && (tree1[key] !== tree2[key]));
    const isRemoved = (_.has(tree1, key) && !_.has(tree2, key));
    const isAdd = (!_.has(tree1, key) && _.has(tree2, key));
    if (isEqual) {
      acc.push([`  ${key}`, typeof (tree1[key]) !== 'object' ? `${tree1[key]}` : normalizeObject(tree1[key])]);
    }
    if (isRemoved) {
      acc.push([`- ${key}`, typeof (tree1[key]) !== 'object' ? `${tree1[key]}` : normalizeObject(tree1[key])]);
    }
    if (isAdd) {
      acc.push([`+ ${key}`, typeof (tree2[key]) !== 'object' ? `${tree2[key]}` : normalizeObject(tree2[key])]);
    }
    if (isChanged) {
      acc.push([`- ${key}`, typeof (tree1[key]) !== 'object' ? `${tree1[key]}` : normalizeObject(tree1[key])]);
      acc.push([`+ ${key}`, typeof (tree2[key]) !== 'object' ? `${tree2[key]}` : normalizeObject(tree2[key])]);
    }
    return acc;
  };

  const noChildKeys = keys.filter((key) => !isValuesObject(tree1, tree2, key));
  const noChild = noChildKeys.reduce(getKeyValueView, []);

  if (noChildKeys.length === keys.length) {
    return noChild;
  }

  const child = keys.filter((key) => isValuesObject(tree1, tree2, key))
    .map((key) => [key, tree1[key], tree2[key]])
    .map((item) => {
      const [key, value1, value2] = item;
      return [`  ${key}`, genDiffDeep(value1, value2)];
    });
  return child.concat(noChild);
};

export default genDiffDeep;
