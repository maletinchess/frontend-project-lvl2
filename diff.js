import _ from 'lodash';
import { normalizeObject } from './utils.js';

const getKeys = (flat1, flat2) => {
  const keys = [flat1, flat2];
  return _.uniq(keys.map((item) => Object.keys(item)).flat()).sort();
};

const isValueObject = (obj, key) => (typeof (obj[key]) === 'object' && !Array.isArray(obj[key]));
const isValuesObject = (obj1, obj2, key) => (isValueObject(obj1, key) && isValueObject(obj2, key));

export const analizeStage = (obj1, obj2, key) => {
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

const getDiff = (tree1, tree2) => {
  const keys = getKeys(tree1, tree2);
  const callback = (acc, key) => {
    if (analizeStage(tree1, tree2, key) === 'add') {
      acc.push([`+ ${key}`, typeof (tree2[key]) === 'object' ? normalizeObject(tree2[key]) : `${tree2[key]}`]);
    }
    if (analizeStage(tree1, tree2, key) === 'removed') {
      acc.push([`- ${key}`, typeof (tree1[key]) === 'object' ? normalizeObject(tree1[key]) : `${tree1[key]}`]);
    }
    if (analizeStage(tree1, tree2, key) === 'unchanged') {
      acc.push([`  ${key}`, typeof (tree1[key]) === 'object' ? normalizeObject(tree1[key]) : `${tree1[key]}`]);
    }
    if (analizeStage(tree1, tree2, key) === 'changed') {
      acc.push([`- ${key}`, typeof (tree1[key]) === 'object' ? normalizeObject(tree1[key]) : `${tree1[key]}`]);
      acc.push([`+ ${key}`, typeof (tree2[key]) === 'object' ? normalizeObject(tree2[key]) : `${tree2[key]}`]);
    }
    if (analizeStage(tree1, tree2, key) === 'analize deep') {
      acc.push([`  ${key}`, getDiff(tree1[key], tree2[key])]);
    }
    return acc;
  };
  const result = keys.reduce(callback, []);
  return result;
};

export default getDiff;
