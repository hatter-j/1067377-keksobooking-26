const CLASS_NAME_FORM_DISABLED = 'ad-form--disabled';
const CLASS_NAME_MAP_DISABLED = 'map__filters--disabled';

const formElement = document.querySelector('.ad-form');
const formFieldsetsElement = formElement.querySelectorAll('fieldset, .ad-form__slider');

const mapFormElement = document.querySelector('.map__filters');
const mapFiltersElement = mapFormElement.querySelectorAll('.map__filter, .map__checkbox');

const setFormDisabled = (elementName, className, elementArrayName) => {
  elementName.classList.add(className);
  elementArrayName.forEach ((el) => {
    el.disabled = true;
  });
};

const setFormActive = (elementName, className, elementArrayName) => {
  elementName.classList.remove(className);
  elementArrayName.forEach ((el) => {
    el.disabled = false;
  });
};

export {setFormDisabled, setFormActive,
  formElement, mapFormElement,
  CLASS_NAME_FORM_DISABLED, CLASS_NAME_MAP_DISABLED,
  formFieldsetsElement, mapFiltersElement
};
