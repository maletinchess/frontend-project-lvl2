import makeStylish from './stylish.js';
import makePlain from './plain.js';

const getFormat = (format) => {
  if (format === 'plain') {
    return makePlain;
  }
  return makeStylish;
};

export default getFormat;
