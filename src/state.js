import onChange from 'on-change';

export const initState = () => {
  const state = {
    feeds: [],
    posts: [],
    form: {
      status: 'filling', // 'filling', 'validating', 'invalid', 'submitted'
      error: null,
      url: '',
    },
    lng: 'ru',
  };

  return onChange(state, (path, value) => {
    console.log('State changed:', path, value);
  });
};

export const addFeed = (state, feed, newPosts) => {
  const newState = onChange.target(state);
  newState.feeds.push(feed);
  newState.posts.push(...newPosts);
};

export const setLanguage = (state, lng) => ({ ...state, lng });
