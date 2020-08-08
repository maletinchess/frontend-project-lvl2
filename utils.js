export const isFlat = (pair) => {
  const [key, value] = pair;
  return pair.length === 2
  && typeof (key) === 'string'
  && !Array.isArray(value)
  && Array.isArray(pair);
};

const isFlatPair = (pair) => {
  const [key, value] = pair;
  return pair.length === 2
  && Array.isArray(pair)
  && typeof (key) === 'string'
  && typeof (value) !== 'object';
};

const isFlatArray = (flats) => {
  if (typeof (flats) === 'string') {
    return false;
  }
  const arrayForCheck = flats.filter((flat) => Array.isArray(flat))
    .filter((flat) => isFlat(flat));
  return arrayForCheck.length === flats.length;
};

export const isFormatable = (pair) => {
  const [key, value] = pair;
  return typeof (key) === 'string'
  && (isFlat(pair) || isFlat(value) || isFlatArray(value));
};

const normalized = (array) => {
  const check = array.filter((item) => isFlatPair(item));
  return check.length === array.length;
};

const format = (pairs) => pairs.map((pair) => {
  const [key, value] = pair;
  return [`  ${key}`, `${value}`];
});

export const normalizeObject = (object) => {
  const arr = Object.entries(object);
  if (normalized(arr)) {
    return format(arr);
  }
  const arrDeep = arr.map((item) => (isFlatPair(item) ? [`  ${item[0]}`, `${item[1]}`] : [`  ${item[0]}`, normalizeObject(item[1])]));
  return arrDeep;
};
