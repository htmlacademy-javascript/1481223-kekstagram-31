const imageUploadInput = document.querySelector('.img-upload__input');
const effectLevel = document.querySelector('.img-upload__effect-level');
const imageUploadPreview = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');
const slider = document.querySelector('.effect-level__slider');
const uiSlider = noUiSlider.create(slider, {
  start: 0,
  connect: true,
  range: {
    'min': 0,
    'max': 0
  },
  step: 0.1
});

let selectedType = '';
uiSlider.on('update', (values) => {
  effectLevelValue.value = +values[0];
  if(selectedType === 'chrome') {
    imageUploadPreview.style.filter = `grayscale(${values[0]})`;
  }
  if(selectedType === 'sepia') {
    imageUploadPreview.style.filter = `sepia(${values[0]})`;
  }
  if(selectedType === 'marvin') {
    imageUploadPreview.style.filter = `invert(${values[0]}%)`;
  }
  if(selectedType === 'phobos') {
    imageUploadPreview.style.filter = `blur(${values[0]}px)`;
  }
  if(selectedType === 'heat') {
    imageUploadPreview.style.filter = `brightness(${values[0]})`;
  }
});

const efffectDefault = document.querySelector('.effects__item input[value="none"]');
const effectChrome = document.querySelector('.effects__item input[value="chrome"]');
const effectSepia = document.querySelector('.effects__item input[value="sepia"]');
const effectMarvin = document.querySelector('.effects__item input[value="marvin"]');
const effectPhobos = document.querySelector('.effects__item input[value="phobos"]');
const effectHeat = document.querySelector('.effects__item input[value="heat"]');

const onChangeUploadInputSetDefaultEffect = () => {
  effectLevel.classList.add('hidden');
  efffectDefault.checked = true;
  imageUploadPreview.style.filter = null;
  effectLevelValue.value = '';
  selectedType = '';
};
imageUploadInput.addEventListener('change', onChangeUploadInputSetDefaultEffect);

const changeUiSlider = (min, max, step) => {
  uiSlider.updateOptions({
    range: {
      min: min,
      max: max
    },
    start: max,
    step: step
  });
};
efffectDefault.addEventListener('click', onChangeUploadInputSetDefaultEffect);
const addChromeEffect = () => {
  effectLevel.classList.remove('hidden');
  selectedType = 'chrome';
  changeUiSlider(0, 1, 0.1);
};
effectChrome.addEventListener('click', addChromeEffect);
const addSepiaEffect = () => {
  effectLevel.classList.remove('hidden');
  selectedType = 'sepia';
  changeUiSlider(0, 1, 0.1);
};
effectSepia.addEventListener('click', addSepiaEffect);
const addMarvinEffect = () => {
  effectLevel.classList.remove('hidden');
  selectedType = 'marvin';
  changeUiSlider(0, 100, 1);
};
effectMarvin.addEventListener('click', addMarvinEffect);
const addPhobosEffect = () => {
  effectLevel.classList.remove('hidden');
  selectedType = 'phobos';
  changeUiSlider(0, 3, 0.1);
};
effectPhobos.addEventListener('click', addPhobosEffect);
const addHeatEffect = () => {
  effectLevel.classList.remove('hidden');
  selectedType = 'heat';
  changeUiSlider(1, 3, 0.1);
};
effectHeat.addEventListener('click', addHeatEffect);
