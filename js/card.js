import {createAdverts} from './data.js';

const mapCanvas = document.querySelector('.map__canvas');
const advertCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const simularAdverts = createAdverts(1);

const simularAdvertsFragment = document.createDocumentFragment();

simularAdverts.forEach(({offer, author}) => {
  const advertElement = advertCardTemplate.cloneNode(true);
  advertElement.querySelector('.popup__title').textContent = offer.title;
  advertElement.querySelector('.popup__text--address').textContent = offer.address;
  advertElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  /*ПОМЕНЯТЬ*/advertElement.querySelector('.popup__type').textContent = offer.type;
  advertElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  advertElement.querySelector('.popup__features').textContent = offer.features;
  advertElement.querySelector('.popup__description').textContent = offer.description;
  advertElement.querySelector('.popup__photos').src = offer.photos;
  advertElement.querySelector('.popup__avatar').src = author.avatar;

  simularAdvertsFragment.append(advertElement);
});

mapCanvas.append(simularAdvertsFragment);
