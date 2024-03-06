import {getRandomInteger, getRandomArrayElement, getRandomIdGenerator} from './util.js';
const getRandomPhotoId = getRandomIdGenerator(1, 25);
const getRandomMessageId = getRandomIdGenerator(1, 1000);

const PHOTOS_COUNT = 25;

const createCommentData = () => {
  const id = getRandomMessageId();
  const avatarNum = getRandomInteger(1, 6);
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  const names = ['Артем', 'Саша', 'Валя', 'Катя', 'Света', 'Таня', 'Максим'];
  return {
    id: id,
    avatar: `img/avatar-${avatarNum}.svg`,
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names)
  };
};

const createPhotoData = () => {
  const id = getRandomPhotoId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `Мое супер фото ${id}`,
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createCommentData)
  };
};

const createPhotosData = () => Array.from({length: PHOTOS_COUNT}, createPhotoData);

export {createPhotosData};
