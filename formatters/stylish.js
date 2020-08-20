const indent = '  ';

const signOfKeyModification = {
  add: '+ ', removed: '- ', unchanged: '  ', before: '- ', after: '+ ', deep: '  ',
};

const normalizeObject = (object, indentNumber) => {
  const keyIndent = '  ';
  const iter = (item, counter) => {
    if (typeof (item) !== 'object') {
      return `${item}`;
    }
    const arrayView = Object.entries(item);
    const modified = arrayView.map((pair) => {
      const [key, value] = pair;
      if (typeof (value) !== 'object') {
        return `${indent.repeat(counter)}${keyIndent}${key}: ${value}`;
      }
      return `${indent.repeat(counter)}${keyIndent}${key}: ${iter(value, counter + 2)}`;
    });
    return `{\n${indent}${modified.join(`\n${indent}`)}\n${indent.repeat(counter)}}`;
  };
  return iter(object, indentNumber);
};

const makeStylish = (diff) => {
  const inner = (nodes, start) => {
    const callback = (node) => {
      const {
        name, value, children, type, stage,
      } = node;
      if (type === 'plain') {
        if (stage === 'updated') {
          return Object.entries(value).map((item) => `${signOfKeyModification[item[0]]}${name}: ${normalizeObject(item[1], start + 2)}`).join(`\n${indent.repeat(start + 1)}`);
        }
        return `${signOfKeyModification[stage]}${name}: ${normalizeObject(value, start + 2)}`;
      }
      return `${signOfKeyModification[stage]}${name}: ${inner(children, start + 2)}`;
    };
    const nodesModified = nodes.map((node) => callback(node));
    return `{\n${indent.repeat(start + 1)}${nodesModified.join(`\n${indent.repeat(start + 1)}`)}\n${indent.repeat(start)}}`;
  };
  return inner(diff, 0);
};

export default makeStylish;
