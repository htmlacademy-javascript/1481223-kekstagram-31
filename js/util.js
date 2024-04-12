import {editFormAlertOpen, editFormAlertClose} from './events.js';
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomIdGenerator = (min, max) => {
  const ids = [];
  return function() {
    let id = getRandomInteger(min, max);
    while(ids.includes(id)) {
      id = getRandomInteger(min, max);
    }
    ids.push(id);
    return id;
  };
};

const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

const createAlert = (type, isOpenEditForm = false) => {
  const templateAlert = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const elementAlert = templateAlert.cloneNode(true);
  const closeAlertButton = elementAlert.querySelector(`.${type}__button`);
  if(isOpenEditForm) {
    document.dispatchEvent(editFormAlertOpen);
  }
  const removeElementWithDispatchCloseEvent = () => {
    elementAlert.remove();
    if(isOpenEditForm) {
      document.dispatchEvent(editFormAlertClose);
    }
  };
  const onEscAlertClose = (evt) => {
    if(evt.key === 'Escape') {
      document.removeEventListener('keydown', onEscAlertClose);
      removeElementWithDispatchCloseEvent();
    }
  };
  closeAlertButton.addEventListener('click', () => {
    document.removeEventListener('keydown', onEscAlertClose);
    removeElementWithDispatchCloseEvent();
  });
  elementAlert.addEventListener('click', (evt) => {
    if(!evt.target.closest(`.${type}__inner`)){
      document.removeEventListener('keydown', onEscAlertClose);
      removeElementWithDispatchCloseEvent();
    }
  });
  document.addEventListener('keydown', onEscAlertClose);
  document.body.appendChild(elementAlert);
};

const createErrorPicturesLoadAlert = () => {
  const templateErrorPicturesLoadAlert = document.querySelector('#data-error').content.querySelector('.data-error');
  const elementErrorPicturesLoadAlert = templateErrorPicturesLoadAlert.cloneNode(true);
  document.body.appendChild(elementErrorPicturesLoadAlert);
  setTimeout(() => elementErrorPicturesLoadAlert.remove(), 5000);
};

export {getRandomInteger, getRandomArrayElement, getRandomIdGenerator, debounce, createAlert, createErrorPicturesLoadAlert};
