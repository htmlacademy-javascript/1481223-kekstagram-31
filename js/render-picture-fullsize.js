const COMMENTS_ONE_SHOW = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentLoader = bigPictureElement.querySelector('.comments-loader');
let addComments;
const showPictureModal = () => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closePictureModal = () => {
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
    const likesElement = bigPictureElement.querySelector('.likes-count');
    likesElement.removeEventListener('click', onLikeAdd);
    document.removeEventListener('keydown', onEscapeModalClose);
    commentLoader.removeEventListener('click', addComments);
  }
};
const commentExampleElement = bigPictureElement.querySelector('.social__comment');
const addCommentsGenerator = (comments, startCount) => {
  let commentsShownCounter = startCount;
  if(comments.length < startCount) {
    commentsShownCounter = comments.length;
  }
  return function() {
    const commentsCount = bigPictureElement.querySelector('.social__comment-total-count');
    const commentsShown = bigPictureElement.querySelector('.social__comment-shown-count');
    const commentContainer = bigPictureElement.querySelector('.social__comments');

    commentsShown.textContent = commentsShownCounter;
    commentsCount.textContent = comments.length;

    if(commentsShownCounter === comments.length) {
      commentLoader.classList.add('hidden');
    } else {
      commentLoader.classList.remove('hidden');
    }
    const commentsFragment = document.createDocumentFragment();
    comments.slice(0, commentsShownCounter).forEach(({avatar, name, message}) => {
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
    commentsShownCounter += COMMENTS_ONE_SHOW;
    if(commentsShownCounter > comments.length) {
      commentsShownCounter = comments.length;
    }
  };
};
const closeButtonElement = document.querySelector('#picture-cancel');
const onClickOnCloseButton = () => {
  const likesElement = bigPictureElement.querySelector('.likes-count');
  closePictureModal();
  likesElement.removeEventListener('click', onLikeAdd);
  document.removeEventListener('keydown', onEscapeModalClose);
  commentLoader.removeEventListener('click', addComments);
};
closeButtonElement.addEventListener('click', onClickOnCloseButton);
const addLikes = (likes) => {
  const likesElement = bigPictureElement.querySelector('.likes-count');
  likesElement.addEventListener('click', onLikeAdd, {once: true});
  likesElement.textContent = likes;
};
const renderPictureFullsize = (photos) => {
  const picturesElement = document.querySelector('.pictures');
  const onClickOnMiniPicture = (evt) => {
    const picture = evt.target.closest('[data-photo-id]');
    if(!picture) {
      return;
    }
    evt.preventDefault();

    const photoId = picture.dataset.photoId;
    const photoData = photos.find((photo) => photo.id === +photoId);
    const bigPictureElementImage = bigPictureElement.querySelector('.big-picture__img img');
    const descriptionElement = bigPictureElement.querySelector('.social__caption');

    showPictureModal();
    document.addEventListener('keydown', onEscapeModalClose);

    addLikes(photoData.likes);
    bigPictureElementImage.src = photoData.url;
    descriptionElement.textContent = photoData.description;

    addComments = addCommentsGenerator(photoData.comments, 5);
    addComments();
    commentLoader.addEventListener('click', addComments);
  };
  picturesElement.addEventListener('click', onClickOnMiniPicture);
};

export {renderPictureFullsize};
