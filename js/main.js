import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';

import {createPhotosData} from './data.js';
import {showPictures} from './showPictures.js';
import {renderPictureFullsize} from './renderPictureFullsize.js';
import './editForm.js';
import './imageScale.js';
import './imageEffects.js';

const photos = createPhotosData();
showPictures(photos); //фотографии
renderPictureFullsize(photos);
