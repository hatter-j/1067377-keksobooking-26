import {ADVERT_TYPE_VALUE} from './data.js';

const createSimularAdverts = ({offer, author}) => {
  const advertCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

  const advertElement = advertCardTemplate.cloneNode(true);

  advertElement.querySelector('.popup__title').textContent = offer.title;
  advertElement.querySelector('.popup__text--address').textContent = offer.address;
  advertElement.querySelector('.popup__text--price').textContent = offer.price ? `${offer.price} ₽/ночь` : '';
  advertElement.querySelector('.popup__type').textContent = ADVERT_TYPE_VALUE[offer.type];
  advertElement.querySelector('.popup__text--capacity').textContent = offer.rooms && offer.guests ? `${offer.rooms} комнаты для ${offer.guests} гостей` : '';
  advertElement.querySelector('.popup__text--time').textContent = offer.checkin && offer.checkout ? `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` : '';
  advertElement.querySelector('.popup__features').textContent = offer.features.join(', ');
  advertElement.querySelector('.popup__description').textContent = offer.description;
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

  return advertElement;
};

export {createSimularAdverts};
