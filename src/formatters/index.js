import renderStylish from './stylish.js';
import renderPlain from './plain.js';
import renderJson from './json.js';

const getRender = (format) => {
  switch (format) {
    case 'plain':
      return renderPlain;
    case 'json':
      return renderJson;
    case 'stylish':
      return renderStylish;
    default:
      throw new Error(`unknown ${format}`);
  }
};

export default getRender;
