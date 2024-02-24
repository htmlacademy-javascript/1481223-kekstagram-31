const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomIdGenerator = (min, max) => {
  const ids = [];
  return function() {
    let id = getRandomInteger(min, max);
    while(ids.includes(id)) {
      id = getRandomInteger(min, max);
    }
    ids.push(id);
    return id;
  };
};
export {getRandomInteger, getRandomArrayElement, getRandomIdGenerator};
