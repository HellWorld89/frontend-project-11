import { initState, addFeed } from './state';
import View from './view';
import { createValidator, validateUrl } from './validator';
import i18next from './i18n';
import { fetchRSS, processFeed, startUpdateCycle } from './rss';

const elements = {
  form: document.querySelector('.rss-form'),
  input: document.getElementById('url-input'),
  feedback: document.querySelector('.feedback'),
};

const view = new View(elements);
const state = initState(() => {
  view.render(); // Этот callback будет вызываться при изменениях состояния
});

i18next.on('initialized', () => {
  view.init(state);
  View.updateStaticTexts();
});

elements.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const rawUrl = formData.get('url');
  const url = rawUrl ? rawUrl.trim() : '';

  state.form.status = 'validating';
  state.form.url = url;

  console.log('Existing feeds:', state.feeds);
  console.log('URL to validate:', url);

  const existingUrls = state.feeds.map((feed) => feed.url);
  const validator = createValidator(existingUrls);

  console.log('Existing URLs:', existingUrls);

  validateUrl(url, validator)
    .then((validUrl) => fetchRSS(validUrl))
    .then((data) => processFeed(url, data))
    .then(({ feed, posts }) => {
      const feedId = Date.now();
      const feedWithId = { ...feed, id: feedId, url };
      const postsWithId = posts.map((post, index) => ({
        ...post,
        id: `${feedId}-${index}`,
        feedId,
      }));
      addFeed(state, feedWithId, postsWithId);
      state.form.status = 'submitted';
      state.form.error = null;

      startUpdateCycle(state);
    })
    .catch((error) => {
      state.form.status = 'invalid';
      state.form.error = error;
    })
    .finally(() => {
      view.render();
    });
});
