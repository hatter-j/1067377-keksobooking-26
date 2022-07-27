import {ADVERT_TYPE_VALUE} from './data.js';

const createSimilarAdverts = ({offer, author}) => {
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
  advertElement.querySelector('.popup__features').textContent = offer.features ? offer.features.join(', ') : '';
  advertElement.querySelector('.popup__description').textContent = offer.description ? offer.description : '';
  const advertPhotosContainerElement = advertElement.querySelector('.popup__photos');
  const advertPhotoElement = advertPhotosContainerElement.querySelector('.popup__photo');
  if (offer.photos) {
    offer.photos.forEach((el) => {
      const advertPhotoCloneElement = advertPhotoElement.cloneNode(true);
      advertPhotoCloneElement.src = el;
      advertPhotosContainerElement.append(advertPhotoCloneElement);
      if (!el) {
        advertPhotoCloneElement.style.display = 'none';
      }
    });
  }
  advertPhotoElement.remove();
  advertElement.querySelector('.popup__avatar').src = author.avatar ? author.avatar : '';

  return advertElement;
};

const closeButtonElement = (formContainer) => {
  const buttonError = formContainer.querySelector('.error__button');
  buttonError.addEventListener('click', () => {
    formContainer.remove();
  });
};

const onPopupEscKeydown = (formContainer) => {
  document.addEventListener('keydown', (evt) => {
    const key = evt.key;
    if (key === 'Escape') {
      formContainer.remove();
    }
  });
};

const onPopupMouseClick = (formContainer) => {
  document.addEventListener('click', () => {
    formContainer.remove();
  });
};

const createErrMessage = () => {
  const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplateElement.cloneNode(true);
  document.body.append(errorElement);

  closeButtonElement(errorElement);
  onPopupEscKeydown(errorElement);
  onPopupMouseClick(errorElement);
};

const createSuccessMessage = () => {
  const successTemplateElement = document
    .querySelector('#success')
    .content.querySelector('.success');
  const successElement = successTemplateElement.cloneNode(true);
  document.body.append(successElement);

  onPopupEscKeydown(successElement);
  onPopupMouseClick(successElement);
};

export {createSimilarAdverts, createErrMessage, createSuccessMessage};
