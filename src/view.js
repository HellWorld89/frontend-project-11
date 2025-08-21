import i18next from './i18n';

export default class View {
  constructor(elements) {
    this.form = elements.form;
    this.input = elements.input;
    this.feedback = elements.feedback;
    this.postsContainer = document.querySelector('.posts');
    this.feedsContainer = document.querySelector('.feeds');
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

  render() {
    this.input.classList.remove('is-invalid');
    this.feedback.classList.remove('text-danger', 'text-success');
    this.feedback.textContent = '';

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
}
