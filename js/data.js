const state = {
  adverts: [],
};

const setAdverts = (adverts) => {
  state.adverts = adverts;
};

const ADVERT_TYPE_VALUE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const ROOM_OPTION = {
  '1' : ['1'],
  '2' : ['1', '2'],
  '3' : ['1', '2', '3'],
  '100' : ['0'],
};

const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

export {
  state,
  setAdverts,
  ADVERT_TYPE_VALUE,
  ROOM_OPTION,
  MIN_PRICE
};
