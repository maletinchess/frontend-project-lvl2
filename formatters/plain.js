const normalizeObject = (object) => {
  if (typeof (object) === 'object') {
    return '[complex value]';
  }
  if (typeof (object) === 'boolean') {
    return `${object}`;
  }
  return `'${object}'`;
};

const stringifyPlain = (node, name) => {
  const { stage, value } = node;
  switch (stage) {
    case 'add':
      return `Property '${name}' was added with value: ${normalizeObject(value)}`;
    case 'removed':
      return `Property '${name}' was removed`;
    case 'updated':
      return `Property '${name}' was updated. From ${normalizeObject(value.before)} to ${normalizeObject(value.after)}`;
    case 'unchanged':
      return `Property '${name}' was not changed.`;
    default:
      throw new Error(`unknown stage: ${stage}`);
  }
};

const makePlain = (nodes) => {
  const callback = (node) => {
    const { name } = node;
    const iter = (node1, acc) => {
      const { type, children } = node1;
      if (type === 'plain') {
        return stringifyPlain(node1, acc);
      }
      return children.filter(({ stage }) => stage !== 'unchanged')
        .map((item) => iter(item, `${acc}.${item.name}`)).join('\n');
    };
    return iter(node, name);
  };
  return nodes.filter(({ stage }) => stage !== 'unchanged')
    .map((node) => callback(node)).join('\n');
};

export default makePlain;
