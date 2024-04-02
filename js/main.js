import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';

import {PICTURES_URL} from './const.js';
import {loadData} from './api.js';
import {renderPictures} from './renderPictures.js';
import {renderPictureFullsize} from './renderPictureFullsize.js';
import {initFilter} from './filter.js';
import './editForm.js';
import './imageScale.js';
import './imageEffects.js';

const createErrorPicturesLoadAlert = () => {
  const templateErrorPicturesLoadAlert = document.querySelector('#data-error').content.querySelector('.data-error');
  const elementErrorPicturesLoadAlert = templateErrorPicturesLoadAlert.cloneNode(true);
  document.body.appendChild(elementErrorPicturesLoadAlert);
  setTimeout(() => elementErrorPicturesLoadAlert.remove(), 5000);
};

loadData(PICTURES_URL, (photos) => {
  renderPictures(photos);
  renderPictureFullsize(photos);
  initFilter(photos);
},
() => {
  createErrorPicturesLoadAlert();
});
