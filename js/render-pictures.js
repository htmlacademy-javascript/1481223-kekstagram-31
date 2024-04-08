const renderPictures = (photos) => {
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesElement = document.querySelector('.pictures');
  const photosFragment = document.createDocumentFragment();

  const oldPhotos = document.querySelectorAll('.picture');
  oldPhotos.forEach((photo) => photo.remove());
  photos.forEach(({id, url, description, likes, comments}) => {
    const photoElement = photoTemplate.cloneNode(true);
    const pictureElement = photoElement.querySelector('.picture__img');
    const likesElement = photoElement.querySelector('.picture__likes');
    const commentElement = photoElement.querySelector('.picture__comments');

    photoElement.setAttribute('data-photo-id', id);
    pictureElement.src = url;
    pictureElement.alt = description;
    likesElement.textContent = likes;
    commentElement.textContent = comments.length;
    photosFragment.appendChild(photoElement);
  });
  picturesElement.appendChild(photosFragment);
};
export {renderPictures};
