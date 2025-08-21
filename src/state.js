// state.js
import onChange from 'on-change';

export const initState = () => {
  const state = {
    feeds: [],
    posts: [],
    form: {
      status: 'filling',
      error: null,
      url: '',
    },
    lng: 'ru',
  };

  return onChange(state, (path, value) => {
    console.log('State changed:', path, value);
  });
};

export const addFeed = (state, url) => {
  // Получаем текущее значение feeds из проксированного состояния
  const currentFeeds = [...state.feeds];
  // Добавляем новый URL
  currentFeeds.push(url.toLowerCase());
  // Обновляем состояние
  state.feeds = currentFeeds;
};

export const setLanguage = (state, lng) => {
  // Изменяем язык напрямую в состоянии
  state.lng = lng;
};
