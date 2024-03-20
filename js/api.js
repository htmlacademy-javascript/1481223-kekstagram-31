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
    .then(() => onSuccess())
    .catch((err) => onError(err));
};

export {loadData, sendData};
