import {createSimilarAdverts} from './card.js';
import {
  setFormActive,
  formElement,
  mapFormElement,
  CLASS_NAME_FORM_DISABLED,
  CLASS_NAME_MAP_DISABLED,
  formFieldsetsElement,
  mapFiltersElement
} from './form-status.js';

import {
  typeFilterElement,
  priceFilterElement,
  roomsFilterElement,
  guestsFilterElement,
  featuresCheckboxes,
  featuresFilterArrays,
  getAdvertFilter,
} from './map-filters.js';

import {debounce} from './util.js';
import {state} from './data.js';


const MAP_SCALE = 12;
const RERENDER_DELAY = 500;
const ADVERTS_QUANTITY = 10;

const TOKYO_COORDINATES = {
  lat: 35.68951,
  lng: 139.69172
};

const addressElement = formElement.querySelector('#address');
const setAddressDefault = () => (addressElement.value = `${TOKYO_COORDINATES.lat}, ${TOKYO_COORDINATES.lng}`);

const map = L.map('map-canvas')
  .on('load', () => {
    setFormActive(formElement, CLASS_NAME_FORM_DISABLED, formFieldsetsElement);
    setFormActive(mapFormElement, CLASS_NAME_MAP_DISABLED, mapFiltersElement);
  })
  .setView(TOKYO_COORDINATES, MAP_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  TOKYO_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon
  }
);
mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  addressElement.value = Object.entries(evt.target.getLatLng())
    .map((objItem) => objItem[1].toFixed(5))
    .join(', ');
});

const customPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = () => {
  const filterAdverts = [];
  for (const advert of state.adverts) {
    if (filterAdverts.length >= ADVERTS_QUANTITY) {
      break;
    }

    if (getAdvertFilter(advert)) {
      filterAdverts.push(advert);
    }
  }

  filterAdverts.forEach(({location, offer, author}) => {
    const marker = L.marker(
      {
        lat: location.lat,
        lng: location.lng
      },
      {
        icon: customPinIcon
      }
    );
    marker.addTo(markerGroup).bindPopup(createSimilarAdverts({offer, author}));
  });
};

const createMarkerWithDebounce = debounce(() => createMarker(state.adverts), RERENDER_DELAY);

const onMapMarkerUpdate = () => {
  markerGroup.clearLayers();
  createMarkerWithDebounce();
};

const updateMap = () => {
  mainPinMarker.setLatLng(TOKYO_COORDINATES);
  map.setView(TOKYO_COORDINATES, MAP_SCALE);
  onMapMarkerUpdate();
};

typeFilterElement.addEventListener('change', onMapMarkerUpdate);
priceFilterElement.addEventListener('change', onMapMarkerUpdate);
roomsFilterElement.addEventListener('change', onMapMarkerUpdate);
guestsFilterElement.addEventListener('change', onMapMarkerUpdate);
featuresCheckboxes.forEach((item) =>
  item.addEventListener('change', () => {
    if (item.checked) {
      featuresFilterArrays.push(item.value);
    } else {
      featuresFilterArrays.splice(featuresFilterArrays.indexOf(item.value, 0), 1);
    }
    onMapMarkerUpdate();
  }),
);

const restMarkers = () => {
  setAddressDefault();
  updateMap();
};

export {
  createMarker,
  restMarkers
};
