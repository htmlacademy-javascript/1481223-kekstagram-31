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

function debounce (callback, timeoutDelay = 500) {
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
}

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

const createErrorPicturesLoadAlert = () => {
  const templateErrorPicturesLoadAlert = document.querySelector('#data-error').content.querySelector('.data-error');
  const elementErrorPicturesLoadAlert = templateErrorPicturesLoadAlert.cloneNode(true);
  document.body.appendChild(elementErrorPicturesLoadAlert);
  setTimeout(() => elementErrorPicturesLoadAlert.remove(), 5000);
};

export {getRandomInteger, getRandomArrayElement, getRandomIdGenerator, debounce, createSuccessAlert, createErrorAlert, createErrorPicturesLoadAlert};
