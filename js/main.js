import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';

//import {createPhotosData} from './data.js';
import {loadData} from './api.js';
import {showPictures} from './showPictures.js';
import {renderPictureFullsize} from './renderPictureFullsize.js';
import './editForm.js';
import './imageScale.js';
import './imageEffects.js';

const PICTURES_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';

loadData(PICTURES_URL, (photos) => {
  showPictures(photos);
  renderPictureFullsize(photos);
});

//const photos = createPhotosData();
