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
    readPostIds: [],
    ui: {
      modal: {
        isOpen: false,
        postId: null,
      },
    },
    onChangeCallback,
  };

  return onChange(state, (path, value) => {
    console.log('State changed:', path, value);
    if (typeof state.onChangeCallback === 'function') {
      state.onChangeCallback();
    }
  });
};

export const addFeed = (state, feed, newPosts) => {
  const newState = onChange.target(state);
  newState.feeds = [...newState.feeds, feed];
  newState.posts = [...newPosts, ...newState.posts];
};

export const markPostAsRead = (state, postId) => {
  const newState = onChange.target(state);
  if (!newState.readPostIds.includes(postId)) {
    newState.readPostIds = [...newState.readPostIds, postId];
    if (typeof state.onChangeCallback === 'function') {
      state.onChangeCallback();
    }
  }
};

export const openModal = (state, postId) => {
  const newState = onChange.target(state);
  newState.ui.modal.isOpen = true;
  newState.ui.modal.postId = postId;
  markPostAsRead(newState, postId);
};

export const closeModal = (state) => {
  const newState = onChange.target(state);
  newState.ui.modal.isOpen = false;
  newState.ui.modal.postId = null;
};

export const addPosts = (state, newPosts) => {
  const newState = onChange.target(state);
  newState.posts = [...newPosts, ...newState.posts];

  if (typeof state.onChangeCallback === 'function') {
    state.onChangeCallback();
  }
};
