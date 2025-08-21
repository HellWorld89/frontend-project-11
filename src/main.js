import { initState, addFeed } from './state';
import View from './view';
import { createValidator, validateUrl } from './validator';
import i18next from './i18n';

const elements = {
  form: document.querySelector('.rss-form'),
  input: document.getElementById('url-input'),
  feedback: document.querySelector('.feedback'),
};

const state = initState();
const view = new View(elements);

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

  const existingUrls = state.feeds.map((feed) => feed);
  const validator = createValidator(existingUrls);

  console.log('Existing URLs:', existingUrls);

  validateUrl(url, validator)
    .then((validUrl) => {
      addFeed(state, validUrl);
      state.form.status = 'submitted';
      state.form.error = null;
    })
    .catch((errorKey) => {
      state.form.status = 'invalid';
      state.form.error = errorKey;
    })
    .finally(() => {
      view.render();
    });
});
