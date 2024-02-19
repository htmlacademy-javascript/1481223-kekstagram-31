const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomIdGenerator = (min, max) => {
  const ids = [];
  return function() {
    let id = getRandomInteger(min, max);
    while(ids.includes(id)) {
      id = getRandomInteger(min, max);
    }
    ids.push(id);
    return id;
  };
};

const getRandomPhotoId = getRandomIdGenerator(1, 25);
const getRandomMessageId = getRandomIdGenerator(1, 1000);

const createComment = () => {
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

const createPhoto = () => {
  const id = getRandomPhotoId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `Мое супер фото ${id}`,
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment)
  };
};

Array.from({length: 25}, createPhoto); //фотографии
