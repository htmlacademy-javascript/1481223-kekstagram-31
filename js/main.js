import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';

import {createErrorPicturesLoadAlert} from './util.js';
import {loadData} from './api.js';
import {renderPictures} from './render-pictures.js';
import {renderPictureFullsize} from './render-picture-fullsize.js';
import {initFilter} from './filter.js';
import './edit-form.js';

const PICTURES_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';

loadData(PICTURES_URL, (photos) => {
  initFilter(photos);
  renderPictures(photos);
  renderPictureFullsize(photos);
},
() => {
  createErrorPicturesLoadAlert();
});
