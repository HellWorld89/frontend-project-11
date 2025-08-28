import { Modal } from 'bootstrap';
import i18next from './i18n';

export default class View {
  constructor(elements) {
    this.form = elements.form;
    this.input = elements.input;
    this.feedback = elements.feedback;
    this.feedsContainer = document.querySelector('.feeds-container');
    this.postsContainer = document.querySelector('.posts-container');
    this.langSwitcher = document.getElementById('lang-switcher');

    this.modalCloseButton = document.getElementById('modalCloseButton');
    this.modalReadFullButton = document.getElementById('modalReadFullButton');

    this.modal = new Modal(document.getElementById('postPreviewModal'));
    this.modalTitle = document.getElementById('postPreviewModalLabel');
    this.modalDescription = document.getElementById('postPreviewDescription');
    this.modalLink = document.getElementById('postPreviewLink');
  }

  init(state) {
    this.state = state;
    this.render();
    this.setupLanguageSwitcher();
    this.updateModalTexts();
  }

  updateModalTexts() {
    if (this.modalCloseButton) {
      this.modalCloseButton.textContent = i18next.t('close');
    }
    if (this.modalReadFullButton) {
      this.modalReadFullButton.textContent = i18next.t('readFull');
    }
    if (this.modalTitle) {
      this.modalTitle.textContent = i18next.t('preview');
    }
  }

  setupLanguageSwitcher() {
    this.langSwitcher.value = i18next.language;

    this.langSwitcher.addEventListener('change', (e) => {
      const newLng = e.target.value;

      i18next.changeLanguage(newLng).then(() => {
        this.state.lng = newLng;
        this.render();
        View.updateStaticTexts();
        this.updateModalTexts();

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
    if (!this.state.feeds) {
      console.error('Feeds are not defined in state');
      return;
    }
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
    if (!this.state.posts) {
      console.error('Posts are not defined in state');
      return;
    }
    this.postsContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();
    this.state.posts.forEach((post) => {
      const isRead = this.state.readPostIds.includes(post.id);
      const postEl = document.createElement('div');
      postEl.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
      postEl.innerHTML = `
        <a href="${post.link}"
           target="_blank"
           rel="noopener noreferrer"
           class="${isRead ? 'fw-normal' : 'fw-bold'} me-3 flex-grow-1">
          ${post.title}
        </a>
        <button type="button"
                class="btn btn-outline-primary btn-sm"
                data-id="${post.id}"
                data-bs-toggle="modal"
                data-bs-target="#postPreviewModal">
          ${i18next.t('preview')}
        </button>
      `;
      const previewButton = postEl.querySelector('button');
      previewButton.addEventListener('click', () => {
        if (this.state.onPreviewButtonClick) {
          this.state.onPreviewButtonClick(post.id);
        }
      });
      fragment.appendChild(postEl);
    });
    this.postsContainer.appendChild(fragment);
  }

  openModal(post) {
    this.modalTitle.textContent = post.title;
    let description = post.description || i18next.t('noDescription');
    description = description.replace(
      /<img/g,
      '<img style="max-width: 100%; height: auto;"',
    );
    this.modalDescription.innerHTML = description;
    this.modalLink.href = post.link;
    this.updateModalTexts();
    this.modal.show();
  }

  render() {
    if (!this.state) {
      console.error('View state is not initialized');
      return;
    }
    this.input.classList.remove('is-invalid');
    this.feedback.classList.remove('text-danger', 'text-success');
    this.feedback.textContent = '';
    this.renderFeeds();
    this.renderPosts();
    View.renderUpdateIndicator();
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

  static renderUpdateIndicator() {
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
