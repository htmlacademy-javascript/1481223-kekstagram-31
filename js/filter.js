import {showPictures} from './showPictures.js';

const initFilter = (photos) => {
  const filters = document.querySelector('.img-filters');
  filters.classList.remove('img-filters--inactive');
  const filterDefault = document.querySelector('#filter-default');
  const filterRandom = document.querySelector('#filter-random');
  const filterDiscussed = document.querySelector('#filter-discussed');
  const filterButtons = document.querySelectorAll('.img-filters__button');
  filterDefault.addEventListener('click', () => {
    for(let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
    }
    filterDefault.classList.add('img-filters__button--active');
    showPictures(photos);
  });
  filterRandom.addEventListener('click', () => {
    for(let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
    }
    filterRandom.classList.add('img-filters__button--active');
    let copyPhotos = photos.slice();
    copyPhotos.sort(() => 0.5 - Math.random());
    copyPhotos = copyPhotos.slice(0, 10);
    showPictures(copyPhotos);
  });
  filterDiscussed.addEventListener('click', () => {
    for(let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
    }
    filterDiscussed.classList.add('img-filters__button--active');
    const copyPhotos = photos.slice();
    copyPhotos.sort((photo1, photo2) => photo2.comments.length - photo1.comments.length);
    showPictures(copyPhotos);
  });
};

export {initFilter};
