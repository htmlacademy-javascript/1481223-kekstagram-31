import {debounce} from './util.js';
import {showPictures} from './showPictures.js';

const COUNT_RANDOM_IMAGE = 10;

const initFilter = (photos) => {
  const filters = document.querySelector('.img-filters');
  filters.classList.remove('img-filters--inactive');
  const filterDefault = document.querySelector('#filter-default');
  const filterRandom = document.querySelector('#filter-random');
  const filterDiscussed = document.querySelector('#filter-discussed');
  const filterButtons = document.querySelectorAll('.img-filters__button');
  const onClickDefaultFilter = () => {
    for(let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
    }
    filterDefault.classList.add('img-filters__button--active');
    showPictures(photos);
  };
  const onClickDefaultFilterDebounce = debounce(onClickDefaultFilter);
  filterDefault.addEventListener('click', onClickDefaultFilterDebounce);
  const onClickRandomFilter = () => {
    for(let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
    }
    filterRandom.classList.add('img-filters__button--active');
    let copyPhotos = photos.slice();
    copyPhotos.sort(() => 0.5 - Math.random());
    copyPhotos = copyPhotos.slice(0, COUNT_RANDOM_IMAGE);
    showPictures(copyPhotos);
  };
  const onClickRandomFilterDebounce = debounce(onClickRandomFilter);
  filterRandom.addEventListener('click', onClickRandomFilterDebounce);
  const onClickDiscussedFilter = () => {
    for(let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
    }
    filterDiscussed.classList.add('img-filters__button--active');
    const copyPhotos = photos.slice();
    copyPhotos.sort((photo1, photo2) => photo2.comments.length - photo1.comments.length);
    showPictures(copyPhotos);
  };
  const onClickDiscussedFilterDebounce = debounce(onClickDiscussedFilter);
  filterDiscussed.addEventListener('click', onClickDiscussedFilterDebounce);
};

export {initFilter};
