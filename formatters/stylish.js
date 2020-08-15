const indent = '  ';
const diffDefault = '  ';
const statusMark = {
  add: '+ ', removed: '- ', unchanged: '  ', before: '- ', after: '+ ', deep: '  ',
};

const normalizeObject = (object, indentNumber) => {
  const iter = (item, counter) => {
    if (typeof (item) !== 'object') {
      return `${item}`;
    }
    const arrayView = Object.entries(item);
    const modified = arrayView.map((pair) => {
      const [key, value] = pair;
      if (typeof (value) !== 'object') {
        return `${indent.repeat(counter)}${diffDefault}${key}: ${value}`;
      }
      return `${indent.repeat(counter)}${diffDefault}${key}: ${iter(value, counter + 2)}`;
    });
    return `{\n${indent}${modified.join(`\n${indent}`)}\n${indent.repeat(counter)}}`;
  };
  return iter(object, indentNumber);
};

const makeStylish = (nodes, start = 0) => {
  const callback = (node) => {
    const {
      name, value, children, type, stage,
    } = node;
    if (type === 'plain') {
      if (stage === 'updated') {
        return Object.entries(value).map((item) => `${statusMark[item[0]]}${name}: ${normalizeObject(item[1], start + 2)}`).join(`\n${indent.repeat(start + 1)}`);
      }
      return `${statusMark[stage]}${name}: ${normalizeObject(value, start + 2)}`;
    }
    return `${statusMark[stage]}${name}: ${makeStylish(children, start + 2)}`;
  };
  const nodesModified = nodes.map((node) => callback(node));
  return `{\n${indent.repeat(start + 1)}${nodesModified.join(`\n${indent.repeat(start + 1)}`)}\n${indent.repeat(start)}}`;
};

export default makeStylish;
