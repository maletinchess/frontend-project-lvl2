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

const formatPlain = (tree) => {
  const iter = (subTree, path) => {
    const modifiedSubTree = subTree.flatMap((node) => {
      const {
        key, type, value, value1, value2, children,
      } = node;
      switch (type) {
        case 'added':
          return `Property '${[...path, key].join('.')}' was added with value: ${stringify(value)}`;
        case 'removed':
          return `Property '${[...path, key].join('.')}' was removed`;
        case 'updated':
          return `Property '${[...path, key].join('.')}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
        case 'unchanged':
          return null;
        case 'nested':
          return iter(children, [...path, key]);
        default:
          throw new Error(`unknown type: ${type}`);
      }
    });
    return modifiedSubTree.filter((item) => item !== null).join('\n');
  };
  return iter(tree, []);
};

export default formatPlain;
