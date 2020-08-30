import _ from 'lodash';

const indent = '  ';

const typeSign = {
  add: '+ ', removed: '- ', unchanged: '  ', nested: '  ',
};

const normalizeObject = (object, indentNumber) => {
  const iter = (item, counter) => {
    if (!_.isObject(item)) {
      return `${item}`;
    }
    const modified = Object.entries(item).map(([key, value]) => {
      if (!_.isObject(value)) {
        return `${indent.repeat(counter)}  ${key}: ${value}`;
      }
      return `${indent.repeat(counter)}  ${key}: ${iter(value, counter + 2)}`;
    });
    return `{\n${indent}${modified.join(`\n${indent}`)}\n${indent.repeat(counter)}}`;
  };
  return iter(object, indentNumber);
};

const formatStylish = (tree, start = 0) => {
  const callback = (node) => {
    const {
      name, type, value, children, valueBefore, valueAfter,
    } = node;
    if (type === 'nested') {
      return `${typeSign[type]}${name}: ${formatStylish(children, start + 2)}`;
    }
    if (type === 'updated') {
      return [
        `- ${name}: ${normalizeObject(valueBefore, start + 2)}`,
        `+ ${name}: ${normalizeObject(valueAfter, start + 2)}`,
      ].join(`\n${indent.repeat(start + 1)}`);
    }
    return `${typeSign[type]}${name}: ${normalizeObject(value, start + 2)}`;
  };
  const treeMod = tree.map((node) => callback(node));
  return `{\n${indent.repeat(start + 1)}${treeMod.join(`\n${indent.repeat(start + 1)}`)}\n${indent.repeat(start)}}`;
};

export default formatStylish;
