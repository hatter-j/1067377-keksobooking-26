import {setUserFormSubmit} from './form-validation.js';
import {createMarker, setMarkerFilter} from './map.js';
import {getData} from './fetch-data.js';
import {showErrorLoadData, debounce} from './util.js';
import {
  setFormDisabled,
  mapFormElement,
  CLASS_NAME_MAP_DISABLED,
  mapFiltersElement,
} from './form-status.js';

const advertsQuantity = 10;
const RERENDER_DELAY = 500;

const onSuccessLoadData = (adverts) => {
  createMarker(adverts.slice(0, advertsQuantity));
  setMarkerFilter(debounce(() => createMarker(adverts), RERENDER_DELAY));
};

const onErrorLoadData = () => {
  showErrorLoadData('При загрузке данных с сервера произошла ошибка!');
  setFormDisabled(mapFormElement, CLASS_NAME_MAP_DISABLED, mapFiltersElement);
};

getData(onSuccessLoadData, onErrorLoadData);

setUserFormSubmit();
