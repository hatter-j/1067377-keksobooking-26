import {createAdverts} from './data.js';

const mapCanvasElement = document.querySelector('.map__canvas');
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
  advertElement.querySelector('.popup__title').textContent = offer.title ? offer.title : '';
  advertElement.querySelector('.popup__text--address').textContent = offer.address ? offer.address : '';
  advertElement.querySelector('.popup__text--price').textContent = offer.price ? `${offer.price} ₽/ночь` : '';
  advertElement.querySelector('.popup__type').textContent = offer.type ? advertTypeValue[offer.type] : '';
  advertElement.querySelector('.popup__text--capacity').textContent = offer.rooms && offer.guests ? `${offer.rooms} комнаты для ${offer.guests} гостей` : '';
  advertElement.querySelector('.popup__text--time').textContent = offer.checkin && offer.checkout ? `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` : '';
  advertElement.querySelector('.popup__features').textContent = offer.features ? offer.features : '';
  advertElement.querySelector('.popup__description').textContent = offer.description ? offer.description : '';
  const advertPhotosContainerElement = advertElement.querySelector('.popup__photos');
  const advertPhotoElement = advertPhotosContainerElement.querySelector('.popup__photo');
  offer.photos.forEach((el) => {
    const advertPhotoCloneElement = advertPhotoElement.cloneNode(true);
    advertPhotoCloneElement.src = el;
    advertPhotosContainerElement.append(advertPhotoCloneElement);
    if (!el) {
      advertPhotoCloneElement.style.display = 'none';
    }
  });
  advertPhotoElement.remove();
  advertElement.querySelector('.popup__avatar').src = author.avatar ? author.avatar : '';

  simularAdvertsFragment.append(advertElement);
});

mapCanvasElement.append(simularAdvertsFragment);
