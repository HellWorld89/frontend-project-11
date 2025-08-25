import i18next from './i18n';

export default class View {
  constructor(elements) {
    this.form = elements.form;
    this.input = elements.input;
    this.feedback = elements.feedback;
    this.feedsContainer = document.querySelector('.feeds-container');
    this.postsContainer = document.querySelector('.posts-container');
    this.langSwitcher = document.getElementById('lang-switcher');
  }

  init(state) {
    this.state = state;
    this.render();
    this.setupLanguageSwitcher();
  }

  setupLanguageSwitcher() {
    this.langSwitcher.value = i18next.language;

    this.langSwitcher.addEventListener('change', (e) => {
      const newLng = e.target.value;

      i18next.changeLanguage(newLng).then(() => {
        this.state.lng = newLng;
        this.render();
        View.updateStaticTexts();

        if (this.state.form.status === 'invalid') {
          this.feedback.textContent = i18next.t(this.state.form.error);
        }
      });
    });
  }

  static updateStaticTexts() {
    const elements = {
      title: document.querySelector('[data-i18n="title"]'),
      description: document.querySelector('[data-i18n="description"]'),
      rssLink: document.querySelector('[data-i18n="rssLink"]'),
      button: document.querySelector('[data-i18n="button"]'),
      example: document.querySelector('[data-i18n="example"]'),
    };

    Object.entries(elements).forEach(([key, element]) => {
      if (element) {
        const newElement = element.cloneNode(true);
        newElement.textContent = i18next.t(key);
        element.parentNode.replaceChild(newElement, element);
      }
    });
  }

  renderFeeds() {
    if (!this.feedsContainer) return;
    this.feedsContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();
    this.state.feeds.forEach((feed) => {
      const feedEl = document.createElement('div');
      feedEl.classList.add('card', 'mb-3');
      feedEl.innerHTML = `
        <div class="card-body">
          <h3 class="card-title">${feed.title}</h3>
          <p class="card-text">${feed.description}</p>
        </div>
      `;
      fragment.appendChild(feedEl);
    });
    this.feedsContainer.appendChild(fragment);
  }

  renderPosts() {
    if (!this.postsContainer) return;
    this.postsContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();
    this.state.posts.forEach((post) => {
      const postEl = document.createElement('div');
      postEl.classList.add('list-group-item');
      postEl.innerHTML = `
        <a href="${post.link}" target="_blank" rel="noopener noreferrer">${post.title}</a>
      `;
      fragment.appendChild(postEl);
    });
    this.postsContainer.appendChild(fragment);
  }

  render() {
    this.input.classList.remove('is-invalid');
    this.feedback.classList.remove('text-danger', 'text-success');
    this.feedback.textContent = '';
    this.renderFeeds();
    this.renderPosts();
    this.renderUpdateIndicator();
    switch (this.state.form.status) {
    case 'invalid':
      this.input.classList.add('is-invalid');
      this.feedback.textContent = i18next.t(this.state.form.error);
      this.feedback.classList.add('text-danger');
      break;

    case 'submitted':
      this.feedback.textContent = i18next.t('success');
      this.feedback.classList.add('text-success');
      this.form.reset();
      this.input.focus();
      break;

    case 'validating':
      this.feedback.textContent = i18next.t('loading');
      break;

    default:
      break;
    }
  }

  renderUpdateIndicator() {
  let indicator = document.getElementById('update-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'update-indicator';
    indicator.style.position = 'fixed';
    indicator.style.bottom = '10px';
    indicator.style.right = '10px';
    indicator.style.padding = '5px 10px';
    indicator.style.background = 'rgba(0, 0, 0, 0.7)';
    indicator.style.color = 'white';
    indicator.style.borderRadius = '4px';
    indicator.style.fontSize = '12px';
    indicator.style.zIndex = '1000';
    document.body.appendChild(indicator);
  }
  indicator.textContent = `Последнее обновление: ${new Date().toLocaleTimeString()}`;
}
}
