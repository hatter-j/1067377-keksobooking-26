import {createSimilarAdverts} from './card.js';
import {setFormActive,
  formElement, mapFormElement,
  CLASS_NAME_FORM_DISABLED, CLASS_NAME_MAP_DISABLED,
  formFieldsetsElement, mapFiltersElement
} from './form-status.js';

const MAP_SCALE = 12;

const TOKYO_COORDINATES = {
  lat: 35.68951,
  lng: 139.69172
};

const addressElement = formElement.querySelector('#address');
addressElement.value = Object.values(TOKYO_COORDINATES).join(', ');

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

const mapFiltersContainer = document.querySelector('.map__filters-container');
const typeFilterElement = mapFiltersContainer.querySelector('#housing-type');
const priceFilterElement = mapFiltersContainer.querySelector('#housing-price');
const priceOption = {
  middle: 0,
  low: 10000,
  high: 50000,
};
const roomsFilterElement = mapFiltersContainer.querySelector('#housing-rooms');
const guestsFilterElement = mapFiltersContainer.querySelector('#housing-guests');
const featuresFilterArrays = [];
const featuresCheckboxes = mapFiltersContainer.querySelectorAll('input[type=checkbox]');

const checkTypeFilter = (offer) => offer.type === typeFilterElement.value || typeFilterElement.value === 'any';

const checkPriceFilter = (offer) => {
  const priceAdvert = offer.price;
  const priceLow = priceOption['low'];
  const priceHight = priceOption['high'];
  switch (priceFilterElement.value) {
    case 'low':
      return priceAdvert < priceLow;
    case 'high':
      return priceAdvert > priceHight;
    case 'middle':
      return priceAdvert <= priceHight && priceAdvert >= priceLow;
    case 'any':
      return true;
  }
};

const checkPRoomsFilter = (offer) => offer.rooms === Number(roomsFilterElement.value) || roomsFilterElement.value === 'any';

const checkGuestsFilter = (offer) => offer.guests === Number(guestsFilterElement.value) || guestsFilterElement.value === 'any';

const checkFeaturesFilter = (offer) => {
  if (featuresFilterArrays.length > 0 && offer.features) {
    let i = 0;
    featuresFilterArrays.forEach((el) => {
      if (offer.features.includes(el)) {
        i += 1;
      }
    });
    return i === featuresFilterArrays.length;
  }
  if (featuresFilterArrays.length === 0) {
    return true;
  }
};

const getAdvertFilter = (advert) => (
  checkTypeFilter(advert.offer) &&
  checkPriceFilter(advert.offer) &&
  checkPRoomsFilter(advert.offer) &&
  checkGuestsFilter(advert.offer) &&
  checkFeaturesFilter(advert.offer)
);

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (similarAdverts) => {
  const filterAdverts = similarAdverts
    .filter((advert) => getAdvertFilter(advert))
    .slice(0, 10);

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

const clearMap = () => {
  markerGroup.clearLayers();
  mainPinMarker.setLatLng(TOKYO_COORDINATES);
  map.setView(TOKYO_COORDINATES, MAP_SCALE);
};

const setMarkerFilter = (cb) => {
  typeFilterElement.addEventListener('change', () => {
    clearMap();
    cb();
  });
  priceFilterElement.addEventListener('change', () => {
    clearMap();
    cb();
  });
  roomsFilterElement.addEventListener('change', () => {
    clearMap();
    cb();
  });
  guestsFilterElement.addEventListener('change', () => {
    clearMap();
    cb();
  });
  featuresCheckboxes.forEach((item) => {
    item.addEventListener('change', () => {
      if (item.checked) {
        featuresFilterArrays.push(item.value);
      } else {
        featuresFilterArrays.splice(featuresFilterArrays.indexOf(item.value, 0), 1);
      }
      clearMap();
      cb();
    });
  });
};

const restMarkers = () => {
  clearMap();
  addressElement.value = `${TOKYO_COORDINATES.lat}, ${TOKYO_COORDINATES.lng}`;
};

export {createMarker, restMarkers, setMarkerFilter};
