import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import ini from 'ini';

const parse = (filepath) => {
  const format = path.extname(filepath).slice(1);
  switch (format) {
    case 'json':
      return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    case 'yml':
      return YAML.parse(fs.readFileSync(filepath, 'utf8'));
    case 'ini':
      return ini.parse(fs.readFileSync(filepath, 'utf8'));
    default:
      throw new Error(`unknown ${format}`);
  }
};

export default parse;
