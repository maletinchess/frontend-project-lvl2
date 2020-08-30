import _ from 'lodash';

const normalizeObject = (object) => {
  if (_.isObject(object)) {
    return '[complex value]';
  }
  if (_.isBoolean(object)) {
    return `${object}`;
  }
  return `'${object}'`;
};

const formatPlain = (tree) => {
  const callback = (node) => {
    const {
      name,
    } = node;
    const iter = (node1, acc) => {
      const {
        type, value, valueBefore, valueAfter, children,
      } = node1;
      switch (type) {
        case 'add':
          return `Property '${acc}' was added with value: ${normalizeObject(value)}`;
        case 'removed':
          return `Property '${acc}' was removed`;
        case 'updated':
          return `Property '${acc}' was updated. From ${normalizeObject(valueBefore)} to ${normalizeObject(valueAfter)}`;
        case 'unchanged':
          return `Property '${acc}' was not changed`;
        case 'nested':
          return children.filter((item) => item.type !== 'unchanged')
            .map((item) => iter(item, `${acc}.${item.name}`)).join('\n');
        default:
          throw new Error(`unknown type: ${type}`);
      }
    };
    return iter(node, name);
  };
  return tree.filter(({ type }) => type !== 'unchanged')
    .map((node) => callback(node)).join('\n');
};

export default formatPlain;
