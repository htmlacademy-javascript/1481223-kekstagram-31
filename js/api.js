const loadData = (url, onSuccess, onError) => {
  fetch(url)
    .then((response) => response.json())
    .then((picturesData) => onSuccess(picturesData))
    .catch(() => onError());
};

const sendData = (url, data, onSuccess, onError) => {
  fetch(url, {
    method: 'POST',
    body: data
  })
    .then((response) => {
      if(response.ok){
        onSuccess();
      } else {
        onError('Не удалось отправить данные!');
      }
    })
    .catch((err) => onError(err));
};

export {loadData, sendData};
