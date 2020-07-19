import fs from 'fs';
import _ from 'lodash';
import readlineSync from 'readline-sync';

const getJsonDiff = () => {
  const path1 = readlineSync.question('Enter the first filepath or filename ');
  const path2 = readlineSync.question('Enter the second filepath or filename ');

  const json1 = fs.readFileSync(path1, 'utf8');
  const obj1 = JSON.parse(json1);
  const keys1 = Object.keys(obj1);

  const json2 = fs.readFileSync(path2, 'utf8');
  const obj2 = JSON.parse(json2);
  const keys2 = Object.keys(obj2);

  const cb = (acc, key) => {
    const isNotChanged = (obj1[key] === obj2[key]);
    const isChanged = (obj1[key] !== obj2[key] && _.has(obj2, key));
    const isRemoved = (!_.has(obj2, key));
    if (isNotChanged) {
      acc.push(key);
    }
    if (isChanged) {
      acc.push(`+ ${key}: ${obj2[key]}\n- ${key}: ${obj1[key]}`);
    }
    if (isRemoved) {
      acc.push(`- ${key}: ${obj1[key]}`);
    }
    return acc;
  };
  const diff1 = keys1.reduce(cb, []);

  const cb2 = (acc, key) => {
    const isAdded = !_.has(obj1, key);
    if (isAdded) {
      acc.push(`+ ${key}: ${obj2[key]}`);
    }
    return acc;
  };
  const diff2 = keys2.reduce(cb2, []);
  const resultDiff = diff1.concat(diff2).join('\n');
  console.log(resultDiff);
};
getJsonDiff();
export default getJsonDiff;
