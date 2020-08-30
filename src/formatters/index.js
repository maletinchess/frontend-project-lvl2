import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const defineFormat = (format) => {
  switch (format) {
    case 'plain':
      return formatPlain;
    case 'json':
      return formatJson;
    case 'stylish':
      return formatStylish;
    default:
      throw new Error(`unknown ${format}`);
  }
};

export default defineFormat;
