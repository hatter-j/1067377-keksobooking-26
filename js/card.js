import {createAdverts} from './data.js';

const mapCanvasElement = document.querySelector('.map__canvas');
//const popupElement = document.querySelector('.popup');
const advertCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const advertTypeValue = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const simularAdverts = createAdverts(1);

const simularAdvertsFragment = document.createDocumentFragment();

simularAdverts.forEach(({offer, author}) => {
  const advertElement = advertCardTemplate.cloneNode(true);
  advertElement.querySelector('.popup__title').textContent = offer.title ? offer.title: '';
  advertElement.querySelector('.popup__text--address').textContent = offer.address ? offer.address: '';
  advertElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь` ? offer.price: ''; /* у цены пропало ₽/ночь */
  advertElement.querySelector('.popup__type').textContent = advertTypeValue[offer.type]; /*? offer.type: ''; не работает тернарный оператор*/
  // if (offer.type === 'flat') {
  //   advertElement.querySelector('.popup__type').textContent = 'Квартира';
  // } if (offer.type === 'bungalow') {
  //   advertElement.querySelector('.popup__type').textContent = 'Бунгало';
  // } if (offer.type === 'house') {
  //   advertElement.querySelector('.popup__type').textContent = 'Дом';
  // } if (offer.type === 'palace') {
  //   advertElement.querySelector('.popup__type').textContent = 'Дворец';
  // } if (offer.type === 'hotel') {
  //   advertElement.querySelector('.popup__type').textContent = 'Отель';
  // }
  advertElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`; /* добавить тернариник */
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`; /* добавить тернариник */
  advertElement.querySelector('.popup__features').textContent = offer.features ? offer.features: '';
  advertElement.querySelector('.popup__description').textContent = offer.description ? offer.description: '';
  //advertElement.querySelector('.popup__photos').src = offer.photos;
  advertElement.querySelector('.popup__avatar').src = author.avatar ? author.avatar: '';

  simularAdvertsFragment.append(advertElement);
});

mapCanvasElement.append(simularAdvertsFragment);
