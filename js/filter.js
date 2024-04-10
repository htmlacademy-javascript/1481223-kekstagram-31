import {debounce} from './util.js';
import {renderPictures} from './render-pictures.js';

const COUNT_RANDOM_IMAGE = 10;

const debounceRenderPictures = debounce(renderPictures);

const initFilter = (photos) => {
  const filters = document.querySelector('.img-filters');
  filters.classList.remove('img-filters--inactive');
  const filterForm = filters.querySelector('.img-filters__form');

  const onClickDefaultFilter = () => {
    debounceRenderPictures(photos);
  };
  const onClickRandomFilter = () => {
    let copyPhotos = photos.slice();
    copyPhotos.sort(() => 0.5 - Math.random());
    copyPhotos = copyPhotos.slice(0, COUNT_RANDOM_IMAGE);
    debounceRenderPictures(copyPhotos);
  };
  const onClickDiscussedFilter = () => {
    const copyPhotos = photos.slice();
    copyPhotos.sort((photo1, photo2) => photo2.comments.length - photo1.comments.length);
    debounceRenderPictures(copyPhotos);
  };

  const onClickFilterChange = (evt) => {
    const elId = evt.target.id;
    switch(elId) {
      case 'filter-default':
        onClickDefaultFilter();
        break;
      case 'filter-random':
        onClickRandomFilter();
        break;
      case 'filter-discussed':
        onClickDiscussedFilter();
        break;
    }
  };
  const onClickFilterChangeMenu = (evt) => {
    const checkedEl = document.querySelector('.img-filters__button--active');
    if(!evt.target.closest('.img-filters__button') || checkedEl === evt.target) {
      return;
    }
    checkedEl.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');

    onClickFilterChange(evt);
  };
  filterForm.addEventListener('click', onClickFilterChangeMenu);
};

export {initFilter};
