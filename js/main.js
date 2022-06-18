// Получаем целое положительное рандомное число //

const getRandomInteger = (min, max) => {
  const randomInteger = Math.floor(Math.random() * (max + 1 - min) + min);
  if (min >= 0 && max >= 0 && max > min) {
    return randomInteger;
  }
  throw new Error('Что-то пошло не так');
};

getRandomInteger(1, 42);

// Получаем рандомное число с плавающей точкой //

const getRandomFractional = (min, max) => {
  const randomFractional = (Math.random() * (max + 1 - min) + min).toFixed(2);
  if (min >= 0 && max >= 0 && max > min) {
    return randomFractional;
  }
  throw new Error('Что-то пошло не так');
};

getRandomFractional(8, 127);
