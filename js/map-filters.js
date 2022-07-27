const mapFiltersContainer = document.querySelector('.map__filters-container');
const mapFiltersElement = document.querySelector('.map__filters');
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

const getAdvertFilter = (advert) =>
  checkTypeFilter(advert.offer) &&
  checkPriceFilter(advert.offer) &&
  checkPRoomsFilter(advert.offer) &&
  checkGuestsFilter(advert.offer) &&
  checkFeaturesFilter(advert.offer);

export {
  mapFiltersElement,
  typeFilterElement,
  priceFilterElement,
  roomsFilterElement,
  guestsFilterElement,
  featuresCheckboxes,
  featuresFilterArrays,
  getAdvertFilter,
};
