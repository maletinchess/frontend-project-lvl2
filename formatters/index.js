import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const defineFormat = (format) => {
  if (format === 'plain') {
    return makePlain;
  }
  if (format === 'json') {
    return makeJson;
  }
  return makeStylish;
};

export default defineFormat;
