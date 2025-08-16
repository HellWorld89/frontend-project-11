import 'bootstrap/dist/css/bootstrap.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rss-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');

    // Пример обработки с промисами
    new Promise((resolve) => {
      // Здесь будет логика загрузки RSS
      console.log('Начало загрузки:', url);
      resolve(url);
    })
    .then((result) => {
      console.log('RSS загружен:', result);
      // Обработка успешной загрузки
    })
    .catch((error) => {
      console.error('Ошибка:', error);
      // Обработка ошибок
    });
  });
});