import {setUserFormSubmit} from './form-validation.js';
import {createMarker} from './map.js';
import {getData} from './fetch-data.js';
import {showErrorLoadData} from './util.js';

const advertsQuantity = 10;

getData(
  (adverts) => createMarker(adverts.slice(0, advertsQuantity)),
  () => showErrorLoadData('При загрузке данных с сервера произошла ошибка!')
);

setUserFormSubmit();
