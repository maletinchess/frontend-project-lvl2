const indent = '  ';
const diffDefault = '  ';
const statusMark = {
  add: '+ ', removed: '- ', unchanged: '  ', 'updated from': '- ', 'updated to': '+ ', deep: '  ',
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

const makeStylish = (nodes, start) => {
  const callback = (node) => {
    const {
      name, value, children, type, stage,
    } = node;
    if (type === 'plain') {
      return `${statusMark[stage]}${name}: ${normalizeObject(value, start + 2)}`;
    }
    return `${statusMark[stage]}${name}: ${makeStylish(children, start + 2)}`;
  };
  const nodesModified = nodes.map((node) => callback(node));
  return `{\n${indent.repeat(start + 1)}${nodesModified.join(`\n${indent.repeat(start + 1)}`)}\n${indent.repeat(start)}}`;
};

export default makeStylish;
