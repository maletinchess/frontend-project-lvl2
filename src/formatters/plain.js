import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isBoolean(value)) {
    return `${value}`;
  }
  return `'${value}'`;
};

const formatPlain = (tree) => tree.flatMap((node) => {
  const {
    key,
  } = node;
  const iter = (node1, acc) => {
    const {
      type, value, value1, value2, children,
    } = node1;
    switch (type) {
      case 'added':
        return `Property '${acc}' was added with value: ${stringify(value)}`;
      case 'removed':
        return `Property '${acc}' was removed`;
      case 'updated':
        return `Property '${acc}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
      case 'unchanged':
        return null;
      case 'nested':
        return children
          .flatMap((item) => iter(item, `${acc}.${item.key}`));
      default:
        throw new Error(`unknown type: ${type}`);
    }
  };
  return iter(node, key);
}).filter((item) => item !== null).join('\n');

export default formatPlain;
