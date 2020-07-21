import fs from 'fs';
import _ from 'lodash';

const getJsonDiff = (path1, path2) => {
  const obj1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const obj2 = JSON.parse(fs.readFileSync(path2, 'utf8'));
  const keys = _.uniq(Object.keys(obj1).concat(Object.keys(obj2)));

  const cb = (acc, key) => {
    const isNotChanged = (_.has(obj1, key) && _.has(obj2, key) && (obj1[key] === obj2[key]));
    const isChanged = (_.has(obj1, key) && _.has(obj2, key) && (obj1[key] !== obj2[key]));
    const isRemoved = (_.has(obj1, key) && !_.has(obj2, key));
    const isAdded = (!_.has(obj1, key) && _.has(obj2, key));
    if (isNotChanged) {
      acc.push(`    ${key}: ${obj1[key]}`);
    }
    if (isChanged) {
      acc.push(`  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`);
    }
    if (isRemoved) {
      acc.push(`  - ${key}: ${obj1[key]}`);
    }
    if (isAdded) {
      acc.push(`  + ${key}: ${obj2[key]}`);
    }
    return acc;
  };
  const output = keys.reduce(cb, []);
  return `{\n${output.join('\n')}\n}\n`;
};

export default getJsonDiff;
