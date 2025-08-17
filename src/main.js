import { initState, addFeed } from './state';
import View from './view';
import { createValidator, validateUrl } from './validator';

// Получаем DOM-элементы (исправлено под новую структуру)
const elements = {
  form: document.querySelector('.rss-form'), // Изменено с getElementById на querySelector
  input: document.getElementById('url-input'),
  feedback: document.querySelector('.feedback'),
};

// Инициализация состояния
const state = initState();

// Создаем экземпляр View
const view = new View(elements);
view.init(state);

// Обработчик отправки формы
elements.form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Получаем данные из формы
  const formData = new FormData(e.target);
  const rawUrl = formData.get('url');
  const url = rawUrl ? rawUrl.trim() : '';

  // Валидация (убрана отдельная проверка пустого поля)
  state.form.status = 'validating';
  state.form.url = url;

  // Создаем валидатор
  const validator = createValidator(state.feeds);

  // Выполняем валидацию
  validateUrl(url, validator)
    .then((validUrl) => {
      addFeed(state, validUrl);
      state.form.status = 'submitted';
    })
    .catch((error) => {
      state.form.status = 'invalid';
      state.form.error = error;
    })
    .finally(() => {
      view.render();
    });
});
