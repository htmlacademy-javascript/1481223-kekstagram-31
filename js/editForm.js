import {sendData} from './api.js';
import {onChangeUploadInputSetDefaultEffect} from './imageEffects.js';
import {onChangeUploadInputSetDefaultScale} from './imageScale.js';

const hashTagField = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imageUploadInput = document.querySelector('.img-upload__input');

const resetEditFormData = () => {
  onChangeUploadInputSetDefaultEffect();
  onChangeUploadInputSetDefaultScale();
  hashTagField.value = '';
  textDescription.value = '';
  imageUploadInput.value = null;
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
const imageUploadForm = document.querySelector('.img-upload__form');
const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});
pristine.addValidator(hashTagField, (value) => {
  if(value === ''){
    return true;
  }
  const tags = value.trim().split(' ');
  let isValid = true;
  const tagRegular = /^#[a-zа-яё0-9]{1,19}$/i;
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
  const tags = value.trim().split(' ');
  if(tags.length > 5) {
    return false;
  }
  return true;
}, 'превышено количество хэштегов');
pristine.addValidator(hashTagField, (value) => {
  if(value === ''){
    return true;
  }
  const tags = value.trim().split(' ');
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

const editFormAlertOpen = new Event('editFormAlertOpen');
const editFormAlertClose = new Event('editFormAlertClose');
document.addEventListener('editFormAlertOpen', () => {
  document.removeEventListener('keydown', onEscapeEditFormClose);
});
document.addEventListener('editFormAlertClose', () => {
  document.addEventListener('keydown', onEscapeEditFormClose);
});
const createSuccessAlert = () => {
  const templateSuccessAlert = document.querySelector('#success').content.querySelector('.success');
  const elementSuccessAlert = templateSuccessAlert.cloneNode(true);
  const closeAlertButton = elementSuccessAlert.querySelector('.success__button');
  const onEscAlertClose = (evt) => {
    if(evt.key === 'Escape') {
      elementSuccessAlert.remove();
      document.removeEventListener('keydown', onEscAlertClose);
    }
  };
  closeAlertButton.addEventListener('click', () => {
    elementSuccessAlert.remove();
    document.removeEventListener('keydown', onEscAlertClose);
  });
  elementSuccessAlert.addEventListener('click', (evt) => {
    if(!evt.target.closest('.success__inner')){
      elementSuccessAlert.remove();
      document.removeEventListener('keydown', onEscAlertClose);
    }
  });
  document.addEventListener('keydown', onEscAlertClose);
  document.body.appendChild(elementSuccessAlert);
};
const createErrorAlert = () => {
  const templateErrorAlert = document.querySelector('#error').content.querySelector('.error');
  const elementErrorAlert = templateErrorAlert.cloneNode(true);
  const closeAlertButton = elementErrorAlert.querySelector('.error__button');
  document.dispatchEvent(editFormAlertOpen);
  const onEscAlertClose = (evt) => {
    if(evt.key === 'Escape') {
      elementErrorAlert.remove();
      document.removeEventListener('keydown', onEscAlertClose);
      document.dispatchEvent(editFormAlertClose);
    }
  };
  closeAlertButton.addEventListener('click', () => {
    elementErrorAlert.remove();
    document.removeEventListener('keydown', onEscAlertClose);
    document.dispatchEvent(editFormAlertClose);
  });
  elementErrorAlert.addEventListener('click', (evt) => {
    if(!evt.target.closest('.error__inner')){
      elementErrorAlert.remove();
      document.removeEventListener('keydown', onEscAlertClose);
      document.dispatchEvent(editFormAlertClose);
    }
  });
  document.addEventListener('keydown', onEscAlertClose);
  document.body.appendChild(elementErrorAlert);
};
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
  const PICTURES_CREATE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
  const valid = pristine.validate();

  if(valid) {
    submitButton.disabled = true;
    const formData = new FormData(evt.target);
    sendData(PICTURES_CREATE_URL, formData, onSuccessSend, onErrorSend);
  }
});
