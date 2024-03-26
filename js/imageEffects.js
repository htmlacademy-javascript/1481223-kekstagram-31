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
  switch(selectedType) {
    case 'chrome':
      imageUploadPreview.style.filter = `grayscale(${values[0]})`;
      break;
    case 'sepia':
      imageUploadPreview.style.filter = `sepia(${values[0]})`;
      break;
    case 'marvin':
      imageUploadPreview.style.filter = `invert(${values[0]}%)`;
      break;
    case 'phobos':
      imageUploadPreview.style.filter = `blur(${values[0]}px)`;
      break;
    case 'heat':
      imageUploadPreview.style.filter = `brightness(${values[0]})`;
      break;
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

const changeUiSlider = (min, max, step, type) => {
  selectedType = type;
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
  changeUiSlider(0, 1, 0.1, 'chrome');
};
effectChrome.addEventListener('click', addChromeEffect);
const addSepiaEffect = () => {
  effectLevel.classList.remove('hidden');
  changeUiSlider(0, 1, 0.1, 'sepia');
};
effectSepia.addEventListener('click', addSepiaEffect);
const addMarvinEffect = () => {
  effectLevel.classList.remove('hidden');
  changeUiSlider(0, 100, 1, 'marvin');
};
effectMarvin.addEventListener('click', addMarvinEffect);
const addPhobosEffect = () => {
  effectLevel.classList.remove('hidden');
  changeUiSlider(0, 3, 0.1, 'phobos');
};
effectPhobos.addEventListener('click', addPhobosEffect);
const addHeatEffect = () => {
  effectLevel.classList.remove('hidden');
  changeUiSlider(1, 3, 0.1, 'heat');
};
effectHeat.addEventListener('click', addHeatEffect);
export {onChangeUploadInputSetDefaultEffect};
