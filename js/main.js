import {setUserFormSubmit} from './form-validation.js';
import {createMarker} from './map.js';
import {getData} from './fetch-data.js';
import {showErrorLoadData} from './util.js';
import {
  setFormDisabled,
  mapFormElement,
  CLASS_NAME_MAP_DISABLED,
  mapFiltersElement,
} from './form-status.js';
import {setAdverts} from './data.js';

const onSuccessLoadData = (adverts) => {
  setAdverts(adverts);
  createMarker();
};

const onErrorLoadData = () => {
  showErrorLoadData('При загрузке данных с сервера произошла ошибка!');
  setFormDisabled(mapFormElement, CLASS_NAME_MAP_DISABLED, mapFiltersElement);
};

getData(onSuccessLoadData, onErrorLoadData);

setUserFormSubmit();
