const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarImgSelection = document.querySelector('#avatar');
const avatarImgPreview = document.querySelector('.ad-form-header__preview img');
const houseImgSelection = document.querySelector('#images');
const houseImgPreview = document.querySelector('.ad-form__photo');

avatarImgSelection.addEventListener('change', () => {
  const avatarFile = avatarImgSelection.files[0];
  const avatarFileName = avatarFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => avatarFileName.endsWith(it));
  if (matches) {
    avatarImgPreview.src = URL.createObjectURL(avatarFile);
  }
});

houseImgSelection.addEventListener('change', () => {
  const houseFile = houseImgSelection.files[0];
  const houseFileName = houseFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => houseFileName.endsWith(it));
  if (!matches) {
    return;
  }
  const houseImgElement = houseImgPreview.querySelector('img');
  if (houseImgElement) {
    houseImgElement.src = URL.createObjectURL(houseFile);
  } else {
    const houseImg = document.createElement('img');
    houseImg.src = URL.createObjectURL(houseFile);
    houseImg.alt = 'Фотография жилья';
    houseImg.classList.add('ad-form__photo');
    houseImgPreview.append(houseImg);
  }
});

const restFormImg = () => {
  avatarImgPreview.src = DEFAULT_AVATAR;

  const houseImgElement = houseImgPreview.querySelector('img');
  if (houseImgElement) {
    houseImgElement.remove();
  }
};

export {
  restFormImg
};
