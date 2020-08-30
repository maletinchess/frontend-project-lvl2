import _ from 'lodash';

const normalizeValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isBoolean(value)) {
    return `${value}`;
  }
  return `'${value}'`;
};

const formatPlain = (tree) => tree.filter(({ type }) => type !== 'unchanged')
  .map((node) => {
    const {
      name,
    } = node;
    const iter = (node1, acc) => {
      const {
        type, value, valueBefore, valueAfter, children,
      } = node1;
      switch (type) {
        case 'add':
          return `Property '${acc}' was added with value: ${normalizeValue(value)}`;
        case 'removed':
          return `Property '${acc}' was removed`;
        case 'updated':
          return `Property '${acc}' was updated. From ${normalizeValue(valueBefore)} to ${normalizeValue(valueAfter)}`;
        case 'unchanged':
          return null;
        case 'nested':
          return children
            .map((item) => iter(item, `${acc}.${item.name}`))
            .filter((item) => item !== null)
            .join('\n');
        default:
          throw new Error(`unknown type: ${type}`);
      }
    };
    return iter(node, name);
  }).join('\n');

export default formatPlain;
