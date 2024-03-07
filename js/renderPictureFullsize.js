const showPictureModal = () => {
  const bigPictureElement = document.querySelector('.big-picture');
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closePictureModal = () => {
  const bigPictureElement = document.querySelector('.big-picture');
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onLikeAdd = (evt) => {
  const likesElement = evt.target;
  const oldCountLike = likesElement.textContent;
  likesElement.textContent = +oldCountLike + 1;
};

const onEscapeModalClose = (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    closePictureModal();
    const likesElement = document.querySelector('.likes-count');
    likesElement.removeEventListener('click', onLikeAdd);
    document.removeEventListener('keydown', onEscapeModalClose);
  }
};

const renderPictureFullsize = (photos) => {
  const picturesElement = document.querySelector('.pictures');
  const closeButtonElement = document.querySelector('#picture-cancel');

  picturesElement.addEventListener('click', (evt) => {
    const picture = evt.target.closest('[data-photo-id]');
    if(!picture) {
      return;
    }

    const photoIndex = picture.dataset.photoId;
    const photoData = photos[photoIndex];
    const bigPictureElement = document.querySelector('.big-picture__img img');
    const likesElement = document.querySelector('.likes-count');
    const commentsCount = document.querySelector('.social__comment-total-count');
    const commentsShown = document.querySelector('.social__comment-shown-count');
    const descriptionElement = document.querySelector('.social__caption');
    const commentCounterBlock = document.querySelector('.social__comment-count');
    const commentLoader = document.querySelector('.comments-loader');
    const commentContainer = document.querySelector('.social__comments');
    const commentExampleElement = document.querySelector('.social__comment');

    showPictureModal();
    document.addEventListener('keydown', onEscapeModalClose);
    likesElement.addEventListener('click', onLikeAdd, {once: true});

    likesElement.textContent = photoData.likes;
    bigPictureElement.src = photoData.url;
    commentsShown.textContent = 2;
    commentsCount.textContent = photoData.comments.length;
    descriptionElement.textContent = photoData.description;
    commentCounterBlock.classList.add('hidden');
    commentLoader.classList.add('hidden');

    const commentsFragment = document.createDocumentFragment();
    photoData.comments.forEach(({avatar, name, message}) => {
      const commentClone = commentExampleElement.cloneNode(true);
      const commentImage = commentClone.querySelector('.social__picture');
      const commentText = commentClone.querySelector('.social__text');

      commentImage.src = avatar;
      commentImage.alt = name;
      commentText.textContent = message;
      commentsFragment.appendChild(commentClone);
    });
    commentContainer.innerHTML = '';
    commentContainer.appendChild(commentsFragment);
  });
  closeButtonElement.addEventListener('click', () => {
    const likesElement = document.querySelector('.likes-count');
    closePictureModal();
    likesElement.removeEventListener('click', onLikeAdd);
    document.removeEventListener('keydown', onEscapeModalClose);
  });
};

export {renderPictureFullsize};
