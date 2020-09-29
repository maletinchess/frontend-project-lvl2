import _ from 'lodash';

const indent = (level, tab = '  ') => tab.repeat(level);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const output = Object.entries(data).map(([key, value]) => `${indent(depth + 2)}    ${key}: ${stringify(value, depth + 2)}`);

  return `{\n${output.join('\n')}\n${indent(depth + 2)}}`;
};

const renderStylish = (ast) => {
  const iter = (subTree, depth) => {
    const output = subTree.flatMap((node) => {
      switch (node.type) {
        case 'updated': {
          const { key, value1, value2 } = node;
          const data1 = `${indent(depth)}  - ${key}: ${stringify(value1, depth)}`;
          const data2 = `${indent(depth)}  + ${key}: ${stringify(value2, depth)}`;
          return [data1, data2];
        }
        case 'added':
          return `${indent(depth)}  + ${node.key}: ${stringify(node.value, depth)}`;
        case 'removed':
          return `${indent(depth)}  - ${node.key}: ${stringify(node.value, depth)}`;
        case 'unchanged':
          return `${indent(depth)}    ${node.key}: ${stringify(node.value, depth)}`;
        case 'nested':
          return `${indent(depth)}    ${node.key}: ${iter(node.children, depth + 2)}`;
        default:
          throw new Error(`no such type ${node.type}`);
      }
    });

    return `{\n${output.join('\n')}\n${indent(depth)}}`;
  };

  return iter(ast, 0);
};

export default renderStylish;
