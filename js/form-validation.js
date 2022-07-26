import {formElement} from './form-status.js';
import {ROOM_OPTION, MIN_PRICE} from './data.js';
import {createErrMessage, createSuccessMessage} from './card.js';
import {restMarkers} from './map.js';
import {sendData} from './fetch-data.js';

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p'
});

const validRoomsElement = formElement.querySelector('#room_number');
const validCapacityElement = formElement.querySelector('#capacity');
const validTypeElement = formElement.querySelector('#type');
const validPriceElement = formElement.querySelector('#price');
const validCheckInElement = formElement.querySelector('#timein');
const validCheckOutElement = formElement.querySelector('#timeout');
const sliderPriceElement = document.querySelector('.ad-form__slider');
const submitBtnElement = document.querySelector('.ad-form__submit');
const restBtnElement = formElement.querySelector('.ad-form__reset');

noUiSlider.create(sliderPriceElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});
const getValidRoom = () => ROOM_OPTION[validRoomsElement.value].includes(validCapacityElement.value);
const getRoomOptionErrorMessage = () => `Выбрано: ${validRoomsElement.value} комнат. Выберите другое количество мест, например: ${ROOM_OPTION[validRoomsElement.value].join(' или ')}`;

const getValidPrice = () => validPriceElement.value >= MIN_PRICE[validTypeElement.value];
const getMinPriceErrorMessage = () => `Цена не может быть меньше: ${MIN_PRICE[validTypeElement.value]}`;

validRoomsElement.addEventListener('change', () => {
  pristine.validate([validRoomsElement, validCapacityElement]);
});
validCapacityElement.addEventListener('change', () => {
  pristine.validate([validRoomsElement, validCapacityElement]);
});

validTypeElement.addEventListener('change', () => {
  validPriceElement.placeholder = MIN_PRICE[validTypeElement.value];
  validPriceElement.min = MIN_PRICE[validTypeElement.value];
  pristine.validate([validTypeElement, validPriceElement]);
});
validPriceElement.addEventListener('change', () => {
  pristine.validate([validTypeElement, validPriceElement]);
});
sliderPriceElement.noUiSlider.on('update', () => {
  validPriceElement.value = sliderPriceElement.noUiSlider.get();
  pristine.validate([validPriceElement, validTypeElement]);
});

validCheckInElement.addEventListener('change', () => {
  validCheckOutElement.value = validCheckInElement.value;
});
validCheckOutElement.addEventListener('change', () => {
  validCheckInElement.value = validCheckOutElement.value;
});

pristine.addValidator(validRoomsElement, getValidRoom, getRoomOptionErrorMessage);
pristine.addValidator(validCapacityElement, getValidRoom, getRoomOptionErrorMessage);

pristine.addValidator(validPriceElement, getValidPrice, getMinPriceErrorMessage);

const setBlockSubmitButton = () => {
  submitBtnElement.disabled = true;
  submitBtnElement.textContent = 'Данные отправляются...';
};

const setUnblockSubmitButton = () => {
  submitBtnElement.disabled = false;
  submitBtnElement.textContent = 'Опубликовать';
};

const onSuccessSendData = () => {
  createSuccessMessage();
  setUnblockSubmitButton();

  formElement.reset();
  restMarkers();
};

const onErrorSendData = () => {
  createErrMessage();
  setUnblockSubmitButton();
};

const setUserFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      setBlockSubmitButton();
      sendData(onSuccessSendData, onErrorSendData, new FormData(evt.target));
    }
  });
};

restBtnElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  formElement.reset();
  restMarkers();
  pristine.reset();
});

export { setUserFormSubmit };
