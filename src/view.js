export default class View {
  constructor(elements) {
    this.form = elements.form;
    this.input = elements.input;
    this.feedback = elements.feedback;
    // Новые элементы для постов и фидов
    this.postsContainer = document.querySelector('.posts');
    this.feedsContainer = document.querySelector('.feeds');
  }

  init(state) {
    this.state = state;
    this.render();
  }

  render() {
    // Сброс предыдущих состояний
    this.input.classList.remove('is-invalid');
    this.feedback.classList.remove('text-danger');
    this.feedback.textContent = '';

    switch (this.state.form.status) {
    case 'invalid':
      this.input.classList.add('is-invalid');
      this.feedback.textContent = this.state.form.error;
      this.feedback.classList.add('text-danger');
      break;

    case 'submitted':
      this.form.reset();
      this.input.focus();
      this.renderFeeds(); // Новый метод для отображения фидов
      break;

    case 'validating':
      // Можно добавить индикатор загрузки
      break;

    default:
        // Дополнительные статусы
    }
  }

  // Новый метод для отображения RSS-лент
  renderFeeds() {
    this.feedsContainer.innerHTML = '';

    this.state.feeds.forEach((feed) => {
      const feedElement = document.createElement('div');
      feedElement.className = 'card mb-3';
      feedElement.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${feed.title}</h5>
          <p class="card-text">${feed.description}</p>
        </div>
      `;
      this.feedsContainer.appendChild(feedElement);
    });
  }

  // Новый метод для отображения постов
  renderPosts(posts) {
    this.postsContainer.innerHTML = '';

    posts.forEach((post) => {
      const postElement = document.createElement('div');
      postElement.className = 'card mb-3';
      postElement.innerHTML = `
        <div class="card-body">
          <h5 class="card-title"><a href="${post.link}" target="_blank">${post.title}</a></h5>
          <p class="card-text">${post.description}</p>
        </div>
      `;
      this.postsContainer.appendChild(postElement);
    });
  }
}
