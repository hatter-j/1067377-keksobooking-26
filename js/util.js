const getRandomInteger = (min, max) => {
  const randomInteger = Math.floor(Math.random() * (max + 1 - min) + min);
  if (min >= 0 && max > min) {
    return randomInteger;
  }
  throw new Error('Что-то пошло не так');
};

const getRandomFractional = (min, max, fractional) => {
  const randomFractional = (Math.random() * (max + 1 - min) + min).toFixed(fractional);
  if (min >= 0 && max > min) {
    return randomFractional;
  }
  throw new Error('Что-то пошло не так');
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomLengthArray = (array) => {
  const maxLength = array.length;
  const arrayLength = getRandomInteger(1, maxLength);
  const newArray = [];

  for (let i = 0; i < arrayLength; i++) {
    const copyOfArray = array[i];
    newArray.push(copyOfArray);
  }

  return newArray;
};

export {getRandomInteger, getRandomFractional, getRandomArrayElement, getRandomLengthArray};
