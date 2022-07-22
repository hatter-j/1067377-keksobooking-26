import {formElement} from './form-status.js';

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p'
});

const validRoomsElement = formElement.querySelector('#room_number');
const validCapacityElement = formElement.querySelector('#capacity');

const ROOM_OPTION = {
  '1' : ['1'],
  '2' : ['1', '2'],
  '3' : ['1', '2', '3'],
  '100' : ['0'],
};

const getValidRoom = () => ROOM_OPTION[validRoomsElement.value].includes(validCapacityElement.value);

const getRoomOptionErrorMessage = () => `Выбрано: ${validRoomsElement.value} комнат. Выберите другое количество мест, например: ${ROOM_OPTION[validRoomsElement.value].join(' или ')}`;

pristine.addValidator(validRoomsElement, getValidRoom, getRoomOptionErrorMessage);
pristine.addValidator(validCapacityElement, getValidRoom, getRoomOptionErrorMessage);

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
