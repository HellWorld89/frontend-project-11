import onChange from 'on-change';

export const initState = (onChangeCallback) => {
  const state = {
    feeds: [],
    posts: [],
    form: {
      status: 'filling', // 'filling', 'validating', 'invalid', 'submitted'
      error: null,
      url: '',
    },
    lng: 'ru',
    onChangeCallback,
  };

  return onChange(state, (path, value) => {
    console.log('State changed:', path, value);
  });
};

export const addFeed = (state, feed, newPosts) => {
  const newState = onChange.target(state);
  newState.feeds.push(feed);
  newState.posts.unshift(...newPosts);
};

export const setLanguage = (state, lng) => ({ ...state, lng });

export const addPosts = (state, newPosts) => {
  const newState = onChange.target(state);
  newState.posts.unshift(...newPosts);

  if (typeof state.onChangeCallback === 'function') {
    state.onChangeCallback();
  }
};
