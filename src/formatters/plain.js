import _ from 'lodash';

const stringifyValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isBoolean(value)) {
    return `${value}`;
  }
  return `'${value}'`;
};

const formatPlain = (tree) => _.flattenDeep(tree.map((node) => {
  const {
    name,
  } = node;
  const iter = (node1, acc) => {
    const {
      type, value, valueBefore, valueAfter, children,
    } = node1;
    switch (type) {
      case 'add':
        return `Property '${acc}' was added with value: ${stringifyValue(value)}`;
      case 'removed':
        return `Property '${acc}' was removed`;
      case 'updated':
        return `Property '${acc}' was updated. From ${stringifyValue(valueBefore)} to ${stringifyValue(valueAfter)}`;
      case 'unchanged':
        return null;
      case 'nested':
        return children
          .map((item) => iter(item, `${acc}.${item.name}`));
      default:
        throw new Error(`unknown type: ${type}`);
    }
  };
  return iter(node, name);
})).filter((item) => item !== null).join('\n');

export default formatPlain;
