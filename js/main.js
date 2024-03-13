import '../vendor/pristine/pristine.min.js';

import {createPhotosData} from './data.js';
import {showPictures} from './showPictures.js';
import {renderPictureFullsize} from './renderPictureFullsize.js';
import './editForm.js';

const photos = createPhotosData();
showPictures(photos); //фотографии
renderPictureFullsize(photos);
