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
  };

  return onChange(state, (path, value) => {
    console.log('State changed:', path, value);
  });
};

export const addFeed = (state, url) => {
  state.feeds.push(url.toLowerCase());
};
