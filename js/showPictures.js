const showPictures = (photos) => {
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesElement = document.querySelector('.pictures');
  const photosFragment = document.createDocumentFragment();

  const oldPhotos = document.querySelectorAll('.picture');
  for(let i = 0; i < oldPhotos.length; i++) {
    oldPhotos[i].remove();
  }
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
export {showPictures};
