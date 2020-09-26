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

const renderPlain = (tree) => {
  const iter = (subTree, path) => {
    const output = subTree.flatMap((node) => {
      const {
        key, type, value, value1, value2, children,
      } = node;

      const keyPath = [...path, key];

      switch (type) {
        case 'added':
          return `Property '${keyPath.join('.')}' was added with value: ${stringify(value)}`;

        case 'removed':
          return `Property '${keyPath.join('.')}' was removed`;

        case 'updated':
          return `Property '${keyPath.join('.')}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;

        case 'unchanged':
          return null;

        case 'nested':
          return iter(children, keyPath);

        default:
          throw new Error(`unknown type: ${type}`);
      }
    });

    return output.filter((item) => item !== null).join('\n');
  };

  return iter(tree, []);
};

export default renderPlain;
