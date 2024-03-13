const openEditForm = () => {
  const imageOverlay = document.querySelector('.img-upload__overlay');
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeEditForm = () => {
  const imageOverlay = document.querySelector('.img-upload__overlay');
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};
const imageUploadInput = document.querySelector('.img-upload__input');
const onEscapeEditFormClose = (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    closeEditForm();
    document.removeEventListener('keydown', onEscapeEditFormClose);
    imageUploadInput.value = null;
  }
};

const imgUploadCancel = document.querySelector('.img-upload__cancel');
const onClickToCloseButtonEditForm = (evt) => {
  evt.preventDefault();
  closeEditForm();
  document.removeEventListener('keydown', onEscapeEditFormClose);
  imageUploadInput.value = null;
};
imgUploadCancel.addEventListener('click', onClickToCloseButtonEditForm);

const onChangeImageUploadInput = () => {
  openEditForm();
  document.addEventListener('keydown', onEscapeEditFormClose);
};
imageUploadInput.addEventListener('change', onChangeImageUploadInput);

const hashTagField = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const onKeyStopPropagationHashTagField = (evt) => {
  evt.stopPropagation();
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
    }
    results.push(tag.toLowerCase());
  });
  return isValid;
}, 'хэштеги повторяются');
pristine.addValidator(textDescription, (value) => {
  if(value.length > 140) {
    return false;
  }
  return true;
}, 'длина комментария больше 140 символов');
imageUploadForm.addEventListener('submit', (evt) => {
  const valid = pristine.validate();

  if(!valid) {
    evt.preventDefault();
  }
  return valid;
});
