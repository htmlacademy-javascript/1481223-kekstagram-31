const imageUploadPreview = document.querySelector('.img-upload__preview img');
const imageUploadInput = document.querySelector('.img-upload__input');
const scaleInput = document.querySelector('.scale__control--value');
const DEFAULT_SCALE = 100;
let pictureScale;
const onChangeUploadInputSetDefaultScale = () => {
  pictureScale = DEFAULT_SCALE;
  scaleInput.value = `${pictureScale}%`;
  imageUploadPreview.style.transform = `scale(${pictureScale / 100})`;
};
imageUploadInput.addEventListener('change', onChangeUploadInputSetDefaultScale);
const buttonBigger = document.querySelector('.scale__control--bigger');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const makePictureBigger = (evt) => {
  evt.preventDefault();
  pictureScale += 25;
  if(pictureScale > 100) {
    pictureScale = 100;
  }
  scaleInput.value = `${pictureScale}%`;
  imageUploadPreview.style.transform = `scale(${pictureScale / 100})`;
};
buttonBigger.addEventListener('click', makePictureBigger);
const makePictureSmaller = (evt) => {
  evt.preventDefault();
  pictureScale -= 25;
  if(pictureScale < 25) {
    pictureScale = 25;
  }
  scaleInput.value = `${pictureScale}%`;
  imageUploadPreview.style.transform = `scale(${pictureScale / 100})`;
};
buttonSmaller.addEventListener('click', makePictureSmaller);
