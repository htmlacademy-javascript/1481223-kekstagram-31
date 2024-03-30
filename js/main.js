import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';

import {loadData} from './api.js';
import {showPictures} from './showPictures.js';
import {renderPictureFullsize} from './renderPictureFullsize.js';
import {initFilter} from './filter.js';
import './editForm.js';
import './imageScale.js';
import './imageEffects.js';

const PICTURES_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';

const createErrorPicturesLoadAlert = () => {
  const templateErrorPicturesLoadAlert = document.querySelector('#data-error').content.querySelector('.data-error');
  const elementErrorPicturesLoadAlert = templateErrorPicturesLoadAlert.cloneNode(true);
  document.body.appendChild(elementErrorPicturesLoadAlert);
  setTimeout(() => elementErrorPicturesLoadAlert.remove(), 5000);
};

loadData(PICTURES_URL, (photos) => {
  showPictures(photos);
  renderPictureFullsize(photos);
  initFilter(photos);
},
() => {
  createErrorPicturesLoadAlert();
});
