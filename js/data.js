const state = {
  adverts: [],
};

const setAdverts = (adverts) => {
  state.adverts = adverts;
};

const advertTypeValue = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const roomOption = {
  '1' : ['1'],
  '2' : ['1', '2'],
  '3' : ['1', '2', '3'],
  '100' : ['0'],
};

const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

export {
  state,
  setAdverts,
  advertTypeValue,
  roomOption,
  minPrice
};
