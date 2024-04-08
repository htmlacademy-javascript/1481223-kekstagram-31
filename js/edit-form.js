import {createSuccessAlert, createErrorAlert} from './util.js';
import {sendData} from './api.js';
import {onChangeUploadInputSetDefaultEffect} from './image-effects.js';
import {onChangeUploadInputSetDefaultScale} from './image-scale.js';
import {PICTURES_CREATE_URL} from './const.js';

const hashTagField = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imageUploadInput = document.querySelector('.img-upload__input');

const imageUploadForm = document.querySelector('.img-upload__form');
const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

const resetEditFormData = () => {
  onChangeUploadInputSetDefaultEffect();
  onChangeUploadInputSetDefaultScale();
  hashTagField.value = '';
  textDescription.value = '';
  imageUploadInput.value = null;
  pristine.reset();
};

const onChangeResetEditFormData = () => {
  onChangeUploadInputSetDefaultEffect();
  onChangeUploadInputSetDefaultScale();
  hashTagField.value = '';
  textDescription.value = '';
};

const openEditForm = () => {
  const imageOverlay = document.querySelector('.img-upload__overlay');
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeEditForm = () => {
  const imageOverlay = document.querySelector('.img-upload__overlay');
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetEditFormData();
};
const onEscapeEditFormClose = (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    closeEditForm();
    document.removeEventListener('keydown', onEscapeEditFormClose);
  }
};

const imgUploadCancel = document.querySelector('.img-upload__cancel');
const onClickToCloseButtonEditForm = (evt) => {
  evt.preventDefault();
  closeEditForm();
  document.removeEventListener('keydown', onEscapeEditFormClose);
};
imgUploadCancel.addEventListener('click', onClickToCloseButtonEditForm);

const onChangeImageUploadInput = () => {
  const FILE_TYPES = ['.jpg', '.jpeg', '.png'];
  const file = imageUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if(!matches) {
    return;
  }
  const imageUploadPreview = document.querySelector('.img-upload__preview img');
  const imageUrl = URL.createObjectURL(file);
  imageUploadPreview.src = imageUrl;
  const effectsPreviews = document.querySelectorAll('.effects__preview');
  for(let i = 0; i < effectsPreviews.length; i++) {
    effectsPreviews[i].style.backgroundImage = `url(${imageUrl})`;
  }
  onChangeResetEditFormData();
  openEditForm();
  document.addEventListener('keydown', onEscapeEditFormClose);
};
imageUploadInput.addEventListener('change', onChangeImageUploadInput);

const onKeyStopPropagationHashTagField = (evt) => {
  if(evt.key === 'Escape') {
    evt.stopPropagation();
  }
};
hashTagField.addEventListener('keydown', onKeyStopPropagationHashTagField);
textDescription.addEventListener('keydown', onKeyStopPropagationHashTagField);
pristine.addValidator(hashTagField, (value) => {
  if(value === ''){
    return true;
  }
  let tags = value.trim().split(' ');
  let isValid = true;
  const tagRegular = /^#[a-zа-яё0-9]{1,19}$/i;
  tags = tags.filter((tag) => tag !== '');
  tags.forEach((tag) => {
    if(!tagRegular.test(tag)) {
      isValid = false;
    }
  });
  return isValid;
}, 'введён невалидный хэштег');
pristine.addValidator(hashTagField, (value) => {
  if(value === ''){
    return true;
  }
  let tags = value.trim().split(' ');
  tags = tags.filter((tag) => tag !== '');
  if(tags.length > 5) {
    return false;
  }
  return true;
}, 'превышено количество хэштегов');
pristine.addValidator(hashTagField, (value) => {
  if(value === ''){
    return true;
  }
  let tags = value.trim().split(' ');
  tags = tags.filter((tag) => tag !== '');
  let isValid = true;
  const results = [];
  tags.forEach((tag) => {
    if(results.includes(tag.toLowerCase())) {
      isValid = false;
    } else {
      results.push(tag.toLowerCase());
    }
  });
  return isValid;
}, 'хэштеги повторяются');
pristine.addValidator(textDescription, (value) => {
  if(value.length > 140) {
    return false;
  }
  return true;
}, 'длина комментария больше 140 символов');

const submitButton = document.querySelector('.img-upload__submit');
const onSuccessSend = () => {
  closeEditForm();
  document.removeEventListener('keydown', onEscapeEditFormClose);
  createSuccessAlert();
  submitButton.disabled = false;
};
const onErrorSend = () => {
  createErrorAlert();
  submitButton.disabled = false;
};
imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const valid = pristine.validate();

  if(valid) {
    submitButton.disabled = true;
    const formData = new FormData(evt.target);
    sendData(PICTURES_CREATE_URL, formData, onSuccessSend, onErrorSend);
  }
});

export {onEscapeEditFormClose};
