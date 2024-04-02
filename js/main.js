import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';

import {createErrorPicturesLoadAlert} from './util.js';
import {PICTURES_URL} from './const.js';
import {loadData} from './api.js';
import {renderPictures} from './renderPictures.js';
import {renderPictureFullsize} from './renderPictureFullsize.js';
import {initFilter} from './filter.js';
import './editForm.js';
import './imageScale.js';
import './imageEffects.js';

loadData(PICTURES_URL, (photos) => {
  renderPictures(photos);
  renderPictureFullsize(photos);
  initFilter(photos);
},
() => {
  createErrorPicturesLoadAlert();
});
