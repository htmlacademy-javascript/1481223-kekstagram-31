const loadData = (url, onSuccess) => {
  fetch(url)
    .then((response) => response.json())
    .then((picturesData) => onSuccess(picturesData));
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
