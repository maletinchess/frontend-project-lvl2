import _ from 'lodash';

const stringify = (key, value, type) => `${type}${key}: ${value}`;

const getIndent = (depth) => '  '.repeat(depth);

const stringifyObject = (object, depth = 0) => {
  const iter = (item, counter) => {
    if (!_.isObject(item)) {
      return item;
    }
    const modified = Object.entries(item).map(([key, value]) => {
      if (!_.isObject(value)) {
        return `${getIndent(counter)}${stringify(key, value, '  ')}`;
      }
      return `${getIndent(counter)}${stringify(key, iter(value, counter + 2), '  ')}`;
    });
    return `{\n${'  '}${modified.join(`\n${'  '}`)}\n${getIndent(counter)}}`;
  };
  return iter(object, depth);
};

const formatStylish = (tree) => {
  const inner = (subTree, depth = 0) => {
    const treeMod = subTree.map((node) => {
      const {
        key, type, value, children, value1, value2,
      } = node;
      switch (type) {
        case 'nested':
          return stringify(key, inner(children, depth + 2), '  ');
        case 'updated':
          return [
            stringify(key, stringifyObject(value1, depth + 2), '- '),
            stringify(key, stringifyObject(value2, depth + 2), '+ '),
          ].join(`\n${getIndent(depth + 1)}`);
        case 'added':
          return stringify(key, stringifyObject(value, depth + 2), '+ ');
        case 'removed':
          return stringify(key, stringifyObject(value, depth + 2), '- ');
        case 'unchanged':
          return stringify(key, stringifyObject(value, depth + 2), '  ');
        default:
          throw new Error(`unknown type ${type}`);
      }
    });
    return `{\n${getIndent(depth + 1)}${treeMod.join(`\n${getIndent(depth + 1)}`)}\n${getIndent(depth)}}`;
  };
  return inner(tree);
};

export default formatStylish;
