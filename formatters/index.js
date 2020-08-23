import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const defineFormat = (format) => {
  switch (format) {
    case 'plain':
      return makePlain;
    case 'json':
      return makeJson;
    case 'stylish':
      return makeStylish;
    default:
      throw new Error(`unknown ${format}`);
  }
};

export default defineFormat;
