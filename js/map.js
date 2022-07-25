import {createAdverts} from './data.js';
import {createSimularAdverts} from './card.js';
import {setFormActive,
  formElement, mapFormElement,
  CLASS_NAME_FORM_DISABLED, CLASS_NAME_MAP_DISABLED,
  formFieldsetsElement, mapFiltersElement
} from './form-status.js';

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
  .setView(TOKYO_COORDINATES, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const markerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  TOKYO_COORDINATES,
  {
    draggable: true,
    icon: markerIcon
  }
);
marker.addTo(map);

marker.on('moveend', (evt) => {
  addressElement.value = Object.entries(evt.target.getLatLng())
    .map((objItem) => objItem[1].toFixed(5))
    .join(', ');
});

const customMarkerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createMarker = ({location, offer, author}) => {
  const customMarker = L.marker({
    lat: location.lat,
    lng: location.lng
  },
  {
    icon: customMarkerIcon
  }
  );
  customMarker.addTo(map)
    .bindPopup(createSimularAdverts({offer, author}));
};

const points = createAdverts(10);
points.forEach(({location, offer, author}) => {
  createMarker({location, offer, author});
});
